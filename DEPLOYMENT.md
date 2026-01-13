# Deployment Guide - Render

This guide walks you through deploying the ASU Survival Guide to [Render](https://render.com/).

## Prerequisites

- A [Render](https://render.com/) account (free tier works!)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database
- Your code pushed to GitHub

---

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ASU Survival Guide"

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/asu-survival-guide.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 2: Create a Render Web Service

1. **Log in to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com/)

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**
   - Select "Connect GitHub"
   - Authorize Render to access your repositories
   - Select your `asu-survival-guide` repository

---

## Step 3: Configure the Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `asu-survival-guide` |
| **Region** | Choose closest to you (e.g., Oregon for US West) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (or `Starter` for better performance) |

---

## Step 4: Add Environment Variables

In the Render dashboard, scroll down to **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/asu-guide?retryWrites=true&w=majority` |
| `ADMIN_SECRET` | `your-secure-admin-password` |
| `NODE_ENV` | `production` |

⚠️ **Important:** Replace the `MONGODB_URI` with your actual MongoDB Atlas connection string!

---

## Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build the Next.js app
   - Start the server

3. Wait for the deployment to complete (usually 2-5 minutes)

4. Once deployed, you'll get a URL like:
   ```
   https://asu-survival-guide.onrender.com
   ```

---

## Step 6: Verify Deployment

1. **Visit your site** - Check the home page loads correctly
2. **Test the Food page** - Verify data loads from MongoDB
3. **Test the Admin page** - Log in with your `ADMIN_SECRET`
4. **Add some content** - Create a new class or food spot

---

## Updating Your Deployment

Render automatically redeploys when you push to the `main` branch:

```bash
git add .
git commit -m "Update: Added new food spot"
git push origin main
```

---

## Troubleshooting

### Build Fails
- Check the Render logs for errors
- Ensure all environment variables are set correctly
- Make sure `package.json` has the correct scripts

### Database Connection Issues
- Verify your `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows `0.0.0.0/0` (all IPs)
- Ensure your database user has the correct permissions

### Slow Cold Starts (Free Tier)
- Free tier instances spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to Starter tier ($7/month) for always-on service

---

## Custom Domain (Optional)

To use a custom domain:

1. Go to your service's **Settings** tab
2. Scroll to **Custom Domains**
3. Click **Add Custom Domain**
4. Follow the DNS configuration instructions

---

## Alternative: Vercel Deployment

If you prefer Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add the same environment variables
4. Deploy!

Vercel has better Next.js integration but Render is also excellent for full-stack apps.

---

**Happy Deploying! 🔱**
