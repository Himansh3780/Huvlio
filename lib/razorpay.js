import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (amount, notes = {}) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      notes: notes,
      receipt: `receipt_${Date.now()}`
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  try {
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpaySignature;
    return isValid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

export const fetchPayment = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Error fetching payment:', error);
    return null;
  }
};
