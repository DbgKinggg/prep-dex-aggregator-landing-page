# Go-Live Checklist

## ✅ Completed

### SEO & Discoverability
- ✅ **Enhanced SEO metadata** with keywords, authors, creator info
- ✅ **Open Graph tags** for social sharing (Facebook, LinkedIn)
- ✅ **Twitter Card tags** for Twitter previews
- ✅ **Sitemap.xml** (auto-generated at `/sitemap.xml`)
- ✅ **Robots.txt** (auto-generated at `/robots.txt`)
- ✅ **Web manifest** for PWA support
- ✅ **Canonical URLs** configured

### Icons & Branding
- ✅ **Favicon** (`/icon.png`)
- ✅ **Apple Touch Icon** (`/apple-icon.png`)
- ✅ **Logo assets** (orange, white, with text variations)

### Performance & Security
- ✅ **Security headers** (HSTS, X-Frame-Options, CSP, etc.)
- ✅ **Image optimization** (AVIF, WebP formats)
- ✅ **React Strict Mode** enabled
- ✅ **Production build** tested and passing

### Configuration
- ✅ **Environment variables** documented
- ✅ **Reown AppKit** multi-chain support (ETH, Arbitrum, BSC, Solana)
- ✅ **Database** ready (Postgres with Prisma)
- ✅ **Next.config.ts** production-optimized

### Documentation
- ✅ **DEPLOYMENT.md** - Complete deployment guide
- ✅ **MIGRATION.md** - Privy to Reown migration guide
- ✅ **.env.example** - Environment variables template
- ✅ **.vercelignore** - Files to exclude from deployment

## 🔲 TODO Before Launch

### Pre-Deployment

- [ ] **Set environment variables in Vercel:**
  - `NEXT_PUBLIC_REOWN_PROJECT_ID`
  - `DATABASE_URL` (Neon Postgres)

- [ ] **Create OG Image:**
  - Create `/public/og-image.png` (1200x630px)
  - Should feature Tangerine branding

- [ ] **Update URLs in metadata:**
  - Replace `tangerine.finance` with actual domain if different
  - Update in `app/layout.tsx`
  - Update in `app/sitemap.ts`
  - Update in `app/robots.ts`
  - Update in `providers/ReownProvider.tsx`

- [ ] **Database Setup:**
  - Create Neon database
  - Run `pnpm db:push` to create tables
  - Test database connection

- [ ] **Reown Configuration:**
  - Add production domain to Reown dashboard
  - Verify all networks are enabled
  - Test wallet connections

### Post-Deployment

- [ ] **Test Core Functionality:**
  - [ ] Homepage loads correctly
  - [ ] Wallet connection works (MetaMask, Phantom, etc.)
  - [ ] All networks accessible (ETH, Arbitrum, BSC, Solana)
  - [ ] Waitlist submission works
  - [ ] Email validation (optional field)
  - [ ] Signature verification works
  - [ ] Confetti animation triggers
  - [ ] Toast notifications appear

- [ ] **SEO Verification:**
  - [ ] View page source - verify meta tags
  - [ ] Test Open Graph: https://www.opengraph.xyz
  - [ ] Test Twitter Card: https://cards-dev.twitter.com/validator
  - [ ] Check `/sitemap.xml` accessible
  - [ ] Check `/robots.txt` accessible
  - [ ] Check `/manifest.webmanifest` accessible

- [ ] **Performance Audit:**
  - [ ] Run Lighthouse (target: 90+ on all metrics)
  - [ ] Check Core Web Vitals
  - [ ] Test on mobile devices
  - [ ] Test on different browsers (Chrome, Firefox, Safari)
  - [ ] Verify images load quickly

- [ ] **Security Check:**
  - [ ] SSL certificate valid
  - [ ] Security headers present (check with securityheaders.com)
  - [ ] No console errors
  - [ ] No sensitive data exposed

- [ ] **Analytics Setup:**
  - [ ] Enable Vercel Analytics
  - [ ] Consider adding Google Analytics
  - [ ] Set up error monitoring (Sentry recommended)

- [ ] **Search Console:**
  - [ ] Add site to Google Search Console
  - [ ] Submit sitemap
  - [ ] Add site to Bing Webmaster Tools

## 📝 Optional Enhancements

### Marketing & Growth
- [ ] Add email capture for updates
- [ ] Create referral system
- [ ] Add social proof (user count)
- [ ] Create landing page A/B tests

### Features
- [ ] Add FAQ section
- [ ] Create "How it Works" section
- [ ] Add feature comparison table
- [ ] Integrate blog/updates

### Analytics & Monitoring
- [ ] Set up conversion tracking
- [ ] Monitor wallet connection rates
- [ ] Track waitlist conversion
- [ ] Set up user behavior analytics

### Social Media
- [ ] Create Twitter account (@tangerine_fi)
- [ ] Create Discord server
- [ ] Set up Telegram group
- [ ] Prepare launch announcement

## 🚀 Launch Day Checklist

- [ ] **Final smoke test:**
  - [ ] All functionality works
  - [ ] No console errors
  - [ ] Mobile responsive
  - [ ] Fast load times

- [ ] **Announcement:**
  - [ ] Tweet launch announcement
  - [ ] Post on Discord/Telegram
  - [ ] Share on relevant crypto forums

- [ ] **Monitoring:**
  - [ ] Watch error logs (first hour)
  - [ ] Monitor database connections
  - [ ] Check wallet connection success rate
  - [ ] Monitor page load times

## 📞 Support Contacts

- **Vercel Support:** https://vercel.com/support
- **Reown Support:** https://docs.reown.com
- **Neon Support:** https://neon.tech/docs

## 🔄 Post-Launch

- [ ] Collect user feedback
- [ ] Fix any bugs reported
- [ ] Monitor analytics for improvements
- [ ] Plan feature roadmap

---

**Ready to deploy?** Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide!
