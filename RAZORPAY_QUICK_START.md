# ⚡ RAZORPAY QUICK SETUP (5 minutes)

## 1️⃣ Get Razorpay API Keys (3 mins)

```
1. Go to: https://dashboard.razorpay.com
2. Sign up (free)
3. Settings → API Keys
4. Copy: Key ID (rzp_test_...)
5. Copy: Key Secret
```

## 2️⃣ Update Environment (1 min)

Edit `.env.local`:
```env
RAZORPAY_KEY_ID="your_key_id_here"
RAZORPAY_KEY_SECRET="your_secret_here"
```

## 3️⃣ Run & Test (1 min)

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

## 4️⃣ Test Payment

**Test Card:**
- Number: `4111 1111 1111 1111`
- Expiry: `12/30` (or any future date)
- CVV: `123` (any 3 digits)

Steps:
1. Sign in with GitHub
2. Generate app → Hit 5 free limit
3. Click "Upgrade" 
4. Use test card above
5. Success! 🎉

## ✅ You're Done!

Razorpay is live. Deploy to Vercel when ready.

---

**Pricing:** ₹29/month for unlimited generations

**Test Card:** 4111 1111 1111 1111 (any future expiry + CVC)

**Questions?** Read RAZORPAY_MIGRATION.md for details
