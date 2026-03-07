import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      console.warn("Invalid Razorpay webhook signature");
      return NextResponse.json({ received: false }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle payment.authorized event
    if (event.event === "payment.authorized") {
      const { payload } = event;
      const paymentId = payload.payment.entity.id;
      const notes = payload.payment.entity.notes;
      const userId = notes?.userId;

      if (userId) {
        // Get payment details
        const payment = await razorpay.payments.fetch(paymentId);

        if (payment.status === "authorized") {
          // Capture the payment
          await razorpay.payments.capture(paymentId, payment.amount, "INR");

          // Update subscription in database
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              plan: "premium",
              monthlyGenerations: 999999, // Unlimited
              generationsUsed: 0,
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            },
            create: {
              userId,
              plan: "premium",
              monthlyGenerations: 999999, // Unlimited
              generationsUsed: 0,
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });
        }
      }
    }

    // Handle subscription.paused or subscription.cancelled
    if (
      event.event === "subscription.paused" ||
      event.event === "subscription.cancelled"
    ) {
      const { payload } = event;
      const notes = payload.subscription.entity.notes;
      const userId = notes?.userId;

      if (userId) {
        // Downgrade to free tier
        await prisma.subscription.update({
          where: { userId },
          data: {
            plan: "free",
            monthlyGenerations: 5,
            generationsUsed: 0,
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 400 }
    );
  }
}
