import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createSubscriptionLink } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const paymentLink = await createSubscriptionLink(
      session.user.id || "",
      session.user.email
    );

    return NextResponse.json({ url: paymentLink.short_url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 500 }
    );
  }
}
