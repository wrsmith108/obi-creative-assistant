# Vercel Deployment Guide

This guide walks you through deploying the Obi Creative Assistant to Vercel.

## Prerequisites
- Vercel account
- GitHub repository with this code
- Vercel CLI (optional for manual deployment)

## Deployment Options

### Option 1: GitHub Integration (Recommended)

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select "Import Git Repository"
   - Authorize Vercel to access your GitHub account
   - Select your repository

2. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy your main branch
   - Future pushes to main will trigger automatic deployments

### Option 2: GitHub Actions (Already Configured)

1. **Get Vercel Tokens**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel login` and authenticate
   - Run `vercel link` in your project directory
   - Run `vercel env pull` to get your project IDs

2. **Add GitHub Secrets**
   Go to your GitHub repository Settings > Secrets and variables > Actions, add:
   - `VERCEL_TOKEN`: Your Vercel access token (get from https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID`: Found in `.vercel/project.json` after linking
   - `VERCEL_PROJECT_ID`: Found in `.vercel/project.json` after linking

3. **How it Works**
   - Push to `main` branch → Production deployment
   - Open a PR → Preview deployment with comment

### Option 3: Manual CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to link and deploy your project.

## Project Configuration

### vercel.json
Already configured with:
- Vite framework preset
- SPA routing (all routes → index.html)
- Correct build output directory

### Build Settings
- Node.js Version: 20.x (recommended)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Post-Deployment

### Custom Domain
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables
This project doesn't require any environment variables. If you add any in the future:
1. Go to Project Settings > Environment Variables
2. Add your variables
3. Redeploy to apply changes

## Troubleshooting

### Build Failures
- Check Node.js version (should be 20.x)
- Ensure all dependencies are in package.json
- Check build logs in Vercel dashboard

### 404 Errors on Routes
- vercel.json already configured for SPA routing
- All routes redirect to index.html for React Router

### Large Bundle Size
- Vite automatically code-splits
- Consider lazy loading routes if needed

## Performance Optimizations

Vercel automatically provides:
- Global CDN
- Automatic HTTPS
- HTTP/2 & HTTP/3
- Brotli compression
- Image optimization (if using Next.js Image)

## Monitoring

Access analytics and logs through:
- Vercel Dashboard > Your Project > Analytics
- Real-time function logs
- Web Vitals monitoring