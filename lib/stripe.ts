import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export const PREMIUM_PLAN_INTERVAL = "monthly";
export const PREMIUM_AMOUNT_PAISE = 2900; // ₹29 in paise (29 * 100)

export async function createSubscriptionLink(userId: string, email: string, phoneNumber?: string) {
  try {
    // Create payment link for premium upgrade
    const paymentLink = await razorpay.paymentLink.create({
      amount: PREMIUM_AMOUNT_PAISE,
      currency: "INR",
      accept_partial: false,
      expire_by: Math.floor(Date.now() / 1000) + 86400, // 24 hours
      reference_id: `premium_${userId}_${Date.now()}`,
      description: "AI App Generator Premium - Monthly Subscription",
      customer: {
        name: email.split("@")[0],
        email: email,
        contact: phoneNumber,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      notes: {
        userId,
        type: "premium_upgrade",
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/razorpay/callback`,
      callback_method: "get",
    });

    return paymentLink;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw new Error("Failed to create payment link");
  }
}

export async function verifyPaymentSignature(
  razorpay_payment_id: string,
  razorpay_subscription_id: string,
  razorpay_signature: string
) {
  const crypto = require("crypto");
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(`${razorpay_subscription_id}|${razorpay_payment_id}`)
    .digest("hex");

  return generated_signature === razorpay_signature;
}

export async function cancelSubscription(subscriptionId: string) {
  return await razorpay.subscriptions.pause(subscriptionId);
}
