# Razorpay Migration Guide

## ✅ What Changed

Your AI Application Generator has been **updated from Stripe to Razorpay** with pricing changed to **₹29/month**.

### Changes Made:

#### 1. **Payment Processing**
- ❌ Stripe → ✅ Razorpay
- Payment links instead of checkout sessions
- Webhook handling updated for Razorpay events

#### 2. **Pricing**
- ❌ $4.99/month → ✅ ₹29/month
- Better for India & South Asia markets
- Lower barrier to entry for students

#### 3. **Files Updated**
| File | Change |
|------|--------|
| `lib/stripe.ts` | Razorpay API integration (still named stripe.ts for backwards compatibility) |
| `app/api/stripe/checkout/route.ts` | Now creates Razorpay payment links |
| `app/api/stripe/webhook/route.ts` | Handles Razorpay webhook events |
| `components/Pricing.tsx` | Shows ₹29/month pricing |
| `package.json` | Replaced stripe with razorpay package |
| `.env.example` | Updated to RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET |
| `prisma/schema.prisma` | Removed Stripe-specific fields |

#### 4. **Environment Variables**

**Before:**
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**After:**
```env
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_secret_key
```

---

## 🚀 Setup Instructions

### Step 1: Create Razorpay Account
1. Go to **https://dashboard.razorpay.com**
2. Sign up (free)
3. Go to **Settings → API Keys**
4. Copy your **Key ID** (starts with `rzp_test_`)
5. Copy your **Key Secret**

### Step 2: Update Environment Variables

Edit your `.env.local` or create it from `.env.example`:

```bash
# Replace Stripe variables with:
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### Step 3: Install Dependencies
```bash
npm install
```
This installs the razorpay npm package (stripe package was removed)

### Step 4: Run Migrations (if needed)
```bash
npx prisma migrate dev
```

### Step 5: Restart Development Server
```bash
npm run dev
```

---

## 🧪 Testing Payments

### Test Card for Razorpay:
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/30)
CVV: Any 3 digits (e.g., 123)
```

### Test Flow:
1. Sign in with GitHub
2. Generate 5 applications (free tier limit)
3. Try to generate 6th → See "Upgrade to Premium"
4. Click "Upgrade to Premium"
5. Redirected to Razorpay payment link
6. Enter test card details above
7. Complete payment
8. Redirected to dashboard
9. Now unlimited generations! ✅

---

## 🔄 How Razorpay Works

### Payment Link (Instead of Checkout)
- User clicks "Upgrade"
- App creates payment link on Razorpay
- User sent to payment page (doesn't leave your domain until payment)
- User enters card/UPI details
- Payment processed
- Razorpay sends webhook to `/api/stripe/webhook`
- Your app updates subscription in database

### Events Handled:
- `payment.authorized` → Subscription activated
- `subscription.paused` → Downgrade to free tier
- `subscription.cancelled` → Downgrade to free tier

---

## 💡 Razorpay vs Stripe

| Feature | Razorpay | Stripe |
|---------|----------|--------|
| **Best For** | India & South Asia | Global |
| **Minimum Per Transaction** | ₹1 | No minimum |
| **Setup Cost** | Free | Free |
| **Settlement Cycle** | 2 days | 2-4 days |
| **UPI Support** | Yes (native) | No |
| **International** | Limited | Full |
| **Subscription Support** | Yes | Yes |
| **Webhook Support** | Yes | Yes |

---

## 📊 Updated Financial Projections

### With ₹29/month Pricing:

| Metric | Value |
|--------|-------|
| Monthly Price (INR) | ₹29 |
| Monthly Price (USD) | ~$0.35 |
| Razorpay Fee | ~2% + ₹0.59 |
| Net Per User | ~₹28 (~$0.34) |
| **For 100 paying users** | ₹2,800/month net |
| **For 1000 paying users** | ₹28,000/month net |

**Key Advantage:** Much lower price point → **Higher conversion rate** from free users

Target conversion: **1-5%** of free users (vs 0.5-1% at higher price points)

---

## 🔐 Security Notes

✅ Already implemented:
- Webhook signature verification
- Payment amount verification
- User ownership checks
- Secure key management via environment variables

⚠️ Still TODO for production:
- Rate limiting on payment API
- CORS configuration
- Payment logging/audit trail
- GDPR compliance (data deletion)

---

## 📞 Support & Troubleshooting

### "Payment link not working"
```
❌ Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
❌ Make sure keys are for test environment (rzp_test_)
✅ Verify webhook endpoint in Razorpay dashboard
```

### "Webhook not firing"
```
❌ Check webhook is enabled in Razorpay dashboard
❌ Verify URL: https://yourdomain.com/api/stripe/webhook
❌ Check webhook logs in Razorpay dashboard
✅ Test manually by triggering payment
```

### "Cannot upgrade - redirect error"
```
❌ Check NEXT_PUBLIC_APP_URL in .env
❌ Verify Razorpay callback URL matches
✅ Restart development server
```

---

## 🎯 Next Steps

1. ✅ Get Razorpay account & API keys
2. ✅ Fill `.env.local` with credentials
3. ✅ Run `npm install && npm run dev`
4. ✅ Test payment flow locally
5. ✅ Deploy to Vercel
6. ✅ Set up webhook in Razorpay dashboard
7. ✅ Launch! 🚀

---

## 📈 Why ₹29?

**Strategic Price Point:**
- Not too high → Better conversion from free tier
- Affordable for students → Primary target market
- Good MRR at scale → 100 users = ₹2,800+/month
- Local pricing → India-focused go-to-market

**Pricing Elasticity:**
- If conversion drops → Try ₹19/month
- If conversion is high → Try ₹49/month
- A/B test different amounts to find sweet spot

---

## 🚀 You're Ready!

Everything is configured for Razorpay. Just:
1. Create Razorpay account
2. Add API keys to `.env.local`
3. Run `npm run dev`
4. Test with provided test card
5. Deploy to Vercel

Good luck! 💪
