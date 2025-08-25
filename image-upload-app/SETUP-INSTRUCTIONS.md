# 🚀 Setup Instructions for Image Upload App

## 📋 Prerequisites
- GitHub account
- Supabase account (free at [supabase.com](https://supabase.com))

## 🔧 Step 1: Supabase Project Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Choose your organization
4. Enter project name (e.g., "image-upload-app")
5. Enter database password (save this!)
6. Choose region closest to you
7. Click "Create new project"

### 1.2 Get Project Credentials
1. Wait for project to be ready (2-3 minutes)
2. Go to **Settings** → **API**
3. Copy these values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

### 1.3 Setup Database
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire content of `supabase-setup.sql` file
3. Paste it in the SQL Editor
4. Click **Run** to execute all commands

## 🔑 Step 2: Environment Variables

### 2.1 Update .env.local
Replace the placeholder values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

### 2.2 Example:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU2NzI5MCwiZXhwIjoxOTUyMTQzMjkwfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM2NTY3MjkwLCJleHAiOjE5NTIxNDMyOTB9.example
```

## 🚀 Step 3: Run the Application

### 3.1 Install Dependencies
```bash
cd image-upload-app
npm install
```

### 3.2 Run Development Server
```bash
npm run dev
```

### 3.3 Open Browser
Go to [http://localhost:3000](http://localhost:3000)

## 🎯 Step 4: Test the Application

### 4.1 Create Account
1. Click "Sign In" → "Don't have an account? Sign up"
2. Enter your email and password
3. Check your email for confirmation (if enabled)

### 4.2 Upload Images
1. Go to "Upload Page 1" or "Upload Page 2"
2. Choose an image file
3. Add title and description (optional)
4. Click "Upload Image"

### 4.3 View Gallery
1. Go to "Gallery" page
2. See all your uploaded images
3. Delete images if needed

## 🌐 Step 5: Deploy to Production

### 5.1 Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### 5.2 Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- Users can only access their own data
- Secure file storage with user isolation
- Protected API endpoints

## 📱 Features Available

- ✅ User authentication (signup/login/logout)
- ✅ Two upload pages for organization
- ✅ Image gallery with delete functionality
- ✅ Responsive design for all devices
- ✅ Secure file storage
- ✅ Database with user isolation

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid URL" error**: Check your Supabase URL in .env.local
2. **"Invalid API key" error**: Verify your anon key
3. **Build fails**: Make sure all environment variables are set
4. **Images not uploading**: Check Supabase Storage bucket setup

### Need Help?
- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

## 🎉 You're All Set!

Your image upload app is now ready with:
- 🔐 Secure authentication
- 📤 Two upload interfaces
- 🖼️ Image gallery
- 🗄️ Database storage
- 💾 File storage
- 🎨 Beautiful UI

Enjoy building with your new app! 🚀