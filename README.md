# AI Application Generator

A full-stack web application that uses AI to help students, job seekers, and professionals generate high-quality applications in minutes.

## Features

- **AI-Powered Generation**: Uses Hugging Face Mistral 7B to generate personalized applications
- **Multiple Application Types**: Support for job, university, scholarship, visa, and internship applications
- **Freemium Model**: 5 free generations/month, unlimited with premium (₹29/month)
- **Authentication**: GitHub OAuth with NextAuth.js
- **Payment Processing**: Razorpay integration for subscriptions
- **Blog Integration**: Sanity.io CMS for blog content
- **Export Options**: PDF and Word document export
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js + GitHub OAuth
- **Payments**: Stripe
- **AI**: Hugging Face Inference API
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Export**: jsPDF, html2canvas
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- GitHub OAuth app credentials
- Stripe account
- Hugging Face API token
- Sanity.io project

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd appl
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in the `.env.local` file with:
- DATABASE_URL (PostgreSQL connection string)
- NEXTAUTH_SECRET (generate with: `openssl rand -base64 32`)
- NEXTAUTH_URL (http://localhost:3000 for dev)
- GITHUB_ID and GITHUB_SECRET
- STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- HUGGINGFACE_API_KEY
- Sanity.io credentials

4. **Initialize the database**
```bash
npx prisma migrate dev
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
appl/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── dashboard/           # User dashboard
│   ├── blog/                # Blog pages
│   ├── auth/                # Authentication pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Hero.tsx            # Landing hero section
│   ├── Features.tsx        # Features showcase
│   ├── Pricing.tsx         # Pricing cards
│   ├── Dashboard.tsx       # Dashboard component
│   ├── ApplicationForm.tsx # Application generator form
│   ├── ApplicationsList.tsx # User's saved applications
│   ├── Navbar.tsx          # Navigation bar
│   └── BlogCard.tsx        # Blog post card
├── lib/                     # Utility libraries
│   ├── auth.ts             # NextAuth configuration
│   ├── stripe.ts           # Stripe helpers
│   ├── huggingface.ts      # HF API integration
│   ├── sanity.ts           # Sanity.io client
│   └── prisma.ts           # Prisma client
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                  # Static files
└── package.json
```

## Database Schema

- **User**: User accounts with email and OAuth info
- **Subscription**: Freemium subscription tracking
- **Application**: Generated applications (saved drafts)
- **Template**: Application templates
- **Account/Session**: NextAuth internal tables

## Revenue Model

### Freemium Pricing
- **Free Tier**: $0/month, 5 generations/month
- **Premium Tier**: $4.99/month, unlimited generations + advanced features

### Additional Revenue Opportunities
- Premium templates
- Resume building tools
- Interview prep courses
- Affiliate partnerships with job boards
- B2B licenses for universities

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
vercel deploy
```

### Manual Deployment

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in with GitHub
- `POST /api/auth/callback/github` - GitHub OAuth callback
- `POST /api/auth/signout` - Sign out

### Applications
- `GET /api/applications` - Get user's applications
- `POST /api/applications` - Generate new application
- `DELETE /api/applications/[id]` - Delete application

### Stripe
- `POST /api/stripe/webhook` - Webhook for subscription events

## Configuration

### Stripe Setup
1. Create a Stripe account
2. Set up a premium subscription price
3. Add webhook endpoint pointing to `/api/stripe/webhook`
4. Copy API keys to environment variables

### Sanity.io Setup
1. Create a Sanity project
2. Define content schema for blog posts
3. Deploy content studio
4. Add API token to environment

### GitHub OAuth
1. Create OAuth app in GitHub settings
2. Set authorization callback URL to `{YOUR_URL}/api/auth/callback/github`
3. Copy credentials to environment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

- Email: support@appgen.com
- Documentation: [docs.appgen.com](https://docs.appgen.com)
- Discord: [Join our community](https://discord.gg/appgen)

## Roadmap

- [ ] Mobile app (React Native)
- [ ] AI improvement suggestions
- [ ] Multiple language support
- [ ] Resume builder integration
- [ ] Interview practice tool
- [ ] LinkedIn profile optimization
- [ ] Job matching algorithm
- [ ] Team collaboration features

---

Built with ❤️ to help students and professionals succeed
