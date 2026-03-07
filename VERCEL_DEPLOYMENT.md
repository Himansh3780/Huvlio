# 🚀 VERCEL DEPLOYMENT GUIDE

## Your GitHub Repo:
https://github.com/Himansh3780/ai-app-generator

## Copy Your Credentials:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.axmymbdwaggalsvnuynf.supabase.co:5432/postgres
GITHUB_ID=[YOUR-GITHUB-ID]
GITHUB_SECRET=[YOUR-GITHUB-SECRET]
RAZORPAY_KEY_ID=[YOUR-RAZORPAY-KEY]
RAZORPAY_KEY_SECRET=[YOUR-RAZORPAY-SECRET]
HUGGINGFACE_API_KEY=[YOUR-HUGGINGFACE-TOKEN]
NEXT_PUBLIC_SANITY_PROJECT_ID=[YOUR-SANITY-PROJECT-ID]
NEXT_PUBLIC_SANITY_DATASET=[YOUR-SANITY-DATASET]
SANITY_API_TOKEN=[YOUR-SANITY-API-TOKEN]
NEXTAUTH_SECRET=[GENERATE-RANDOM-STRING]
NODE_ENV=production
```

---

## Step-by-Step Deployment:

### 1. Go to Vercel:
https://vercel.com

### 2. Click "Add New" → "Project"

### 3. Select Your GitHub Repo:
- Click "Import"
- Search: `ai-app-generator`
- Select: `Himansh3780/ai-app-generator`
- Click "Import"

### 4. Configure Project:
- Framework Preset: **Next.js** (auto-selected)
- Root Directory: **.** (current)
- Click "Continue"

### 5. Add Environment Variables:
- Click "Environment Variables"
- Copy-paste EACH variable from above into:
  - Name: (left side)
  - Value: (right side)

**Variables to add:**
1. DATABASE_URL
2. GITHUB_ID
3. GITHUB_SECRET
4. RAZORPAY_KEY_ID
5. RAZORPAY_KEY_SECRET
6. HUGGINGFACE_API_KEY
7. NEXT_PUBLIC_SANITY_PROJECT_ID
8. NEXT_PUBLIC_SANITY_DATASET
9. SANITY_API_TOKEN
10. NEXTAUTH_SECRET
11. NODE_ENV

### 6. Deploy:
- Click "Deploy"
- Wait 5-10 minutes...
- You'll get a URL like: `https://ai-app-generator-himansh3780.vercel.app`

---

## After Deployment:

### Update GitHub OAuth:
1. Go to: https://github.com/settings/developers
2. Find your OAuth App
3. Update: `Authorization callback URL`
   - Change to: `https://your-vercel-url/api/auth/callback/github`

### Update Razorpay Webhook:
1. Go to: https://dashboard.razorpay.com
2. Settings → Webhooks
3. Add webhook endpoint: `https://your-vercel-url/api/stripe/webhook`

### Test Your Live App:
1. Visit your Vercel URL
2. Click "Get Started Free"
3. Sign in with GitHub
4. Generate an application
5. Try upgrade to premium (test with card: 4111 1111 1111 1111)

---

## Your Live Project URL:
(Check Vercel dashboard after deployment)

Example: https://ai-app-generator-himansh3780.vercel.app

---

## Troubleshooting:

**Build fails?**
- Check all environment variables are added
- Make sure DATABASE_URL has correct password

**GitHub login fails?**
- Update OAuth callback URL in GitHub settings
- Use your actual Vercel URL

**Payments not working?**
- Add Razorpay webhook in dashboard
- Use test card: 4111 1111 1111 1111

---

**Let me know your Vercel URL once deployed!** 🎉
