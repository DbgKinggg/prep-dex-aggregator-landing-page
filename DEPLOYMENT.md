# Deployment Guide

## Pre-Deployment Checklist

### Environment Variables

Ensure the following environment variables are set in Vercel:

```bash
# Required
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id_here
DATABASE_URL=your_neon_postgres_connection_string

# Optional
NODE_ENV=production
```

### Database Setup

1. **Create Neon Database:**
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string

2. **Database Schema:**
   - Schema is automatically pushed during Vercel build via `vercel-build` script
   - For local development, run: `pnpm db:push`

3. **Verify Database:**
   ```bash
   pnpm db:studio
   ```

### Reown AppKit Setup

1. Visit [Reown Cloud](https://cloud.reown.com)
2. Create a new project
3. Add your domain to allowed domains:
   - Development: `localhost:3000`
   - Production: `tangerine.exchange`
4. Copy your Project ID to environment variables

## Vercel Deployment

### Initial Setup

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository

2. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `landing-page`
   - **Build Command:** `pnpm vercel-build` (auto-runs db push + build)
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`

   **Note:** The `vercel-build` script automatically:
   - Generates Prisma client (`postinstall`)
   - Pushes database schema (`prisma db push`)
   - Builds the Next.js app

3. **Environment Variables:**
   Add all required environment variables from the checklist above

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### Domain Setup

1. **Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add `tangerine.exchange`
   - Add `www.tangerine.exchange` (redirect to main domain)

2. **Configure DNS:**
   Point your domain's A record to Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   Add CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - Wait for DNS propagation (can take up to 48 hours)

## Post-Deployment

### Verify Deployment

1. **Check Homepage:**
   - Visit https://tangerine.exchange
   - Verify wallet connection works
   - Test waitlist submission

2. **Check SEO:**
   - View source and verify meta tags
   - Test Open Graph: https://www.opengraph.xyz
   - Test Twitter Card: https://cards-dev.twitter.com/validator

3. **Check Performance:**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify image optimization

4. **Check Security:**
   - SSL certificate is valid
   - Security headers are present
   - CORS is configured correctly

### Monitoring

1. **Vercel Analytics:**
   - Enable Analytics in project settings
   - Monitor Core Web Vitals
   - Track user engagement

2. **Error Tracking:**
   - Consider integrating Sentry
   - Monitor Vercel logs for errors

3. **Database Monitoring:**
   - Check Neon dashboard for query performance
   - Monitor connection pool usage

### Search Engine Optimization

1. **Submit Sitemap:**
   - Google Search Console: https://search.google.com/search-console
   - Submit sitemap: `https://tangerine.exchange/sitemap.xml`

2. **Verify Ownership:**
   - Add Google Search Console verification
   - Add Bing Webmaster Tools verification

3. **Social Media:**
   - Update Twitter profile
   - Share launch announcement

## Rollback Procedure

If issues arise:

1. **Instant Rollback:**
   - Go to Vercel Deployments
   - Click "..." on previous working deployment
   - Click "Promote to Production"

2. **Database Rollback:**
   - Neon supports branching
   - Revert to previous branch if needed

## Troubleshooting

### Build Fails

- Check environment variables are set
- Verify pnpm version matches local
- Check build logs for specific errors

### Wallet Connection Issues

- Verify Reown Project ID is correct
- Check domain is whitelisted in Reown dashboard
- Verify network configuration

### Database Connection Issues

- Check DATABASE_URL is correct
- Verify Neon database is active
- Check IP whitelist in Neon dashboard

### Performance Issues

- Enable Edge caching
- Optimize images
- Review bundle size

## Maintenance

### Regular Tasks

- **Weekly:** Check error logs
- **Monthly:** Review analytics
- **Quarterly:** Update dependencies

### Updates

To deploy updates:
```bash
git push origin main
```

Vercel automatically deploys on push to main branch.

## Support

For deployment issues:
- Vercel Support: https://vercel.com/support
- Reown Support: https://docs.reown.com
- Neon Support: https://neon.tech/docs
