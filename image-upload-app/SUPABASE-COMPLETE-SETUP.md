# 🚀 Supabase Complete Setup Guide

## 📋 Overview
هذا الدليل هيساعدك تعمل setup كامل لـ Supabase بحيث التطبيق يشتغل 100%

## 🔑 Your Credentials
```
Project URL: https://lpknpemgcufnrvyreiue.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwa25wZW1nY3VmbnJ2eXJlaXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzg3OTAsImV4cCI6MjA3MTcxNDc5MH0.M4WTe1nNADarD_7yqTFjJd_xYyaKB-8e5I8A9XjcH2Q
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwa25wZW1nY3VmbnJ2eXJlaXVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjEzODc5MCwiZXhwIjoyMDcxNzE0NzkwfQ.D1tbJnWVyR9ypnwxu28PTI3PJA-P4sWP9EhE1e-FA6A
```

## 🗂️ Step 1: Setup Database

### 1.1 Go to SQL Editor
1. أدخل على Supabase Dashboard: https://supabase.com/dashboard
2. اختار project: **lpknpemgcufnrvyreiue**
3. ادخل على **SQL Editor** من الساند بار الشمال

### 1.2 Run Complete Setup Script
1. انسخ كل محتوى الملف `complete-supabase-setup.sql`
2. ألصقه في SQL Editor
3. اضغط **Run** أو **Execute**

## 📁 Step 2: Setup Storage

### 2.1 Go to Storage
1. ادخل على **Storage** من الساند بار الشمال
2. لازم تلاقي bucket اسمه **images** اتعمل تلقائياً من الـ SQL script

### 2.2 Verify Storage Bucket
1. اضغط على **images** bucket
2. تأكد إن **Public** مفعل
3. تأكد إن **File size limit** مناسب (اتركه default)

## 🔐 Step 3: Setup Authentication

### 3.1 Go to Authentication
1. ادخل على **Authentication** من الساند بار الشمال
2. ادخل على **Settings**

### 3.2 Configure Auth Settings
1. تأكد إن **Email confirmation** مُفعل
2. في **Site URL** حط: `https://poetic-kelpie-2d5bfe.netlify.app`
3. في **Redirect URLs** حط:
   ```
   https://poetic-kelpie-2d5bfe.netlify.app
   https://poetic-kelpie-2d5bfe.netlify.app/login
   https://poetic-kelpie-2d5bfe.netlify.app/upload-1
   https://poetic-kelpie-2d5bfe.netlify.app/upload-2
   https://poetic-kelpie-2d5bfe.netlify.app/gallery
   ```

## 🧪 Step 4: Test Setup

### 4.1 Test Database Connection
في SQL Editor، اجري الكويري ده:
```sql
SELECT * FROM public.users LIMIT 5;
SELECT * FROM public.images LIMIT 5;
SELECT * FROM storage.buckets WHERE id = 'images';
```

### 4.2 Test Authentication
1. ادخل على التطبيق: https://poetic-kelpie-2d5bfe.netlify.app
2. جرب تعمل **Sign Up** بإيميل جديد
3. تأكد إنك تقدر تدخل

### 4.3 Test Image Upload
1. لما تدخل، جرب ترفع صورة في **Upload 1** أو **Upload 2**
2. تأكد إن الصورة اتحفظت في **Gallery**

## 🚨 Troubleshooting

### إذا كان فيه مشكلة في الـ Authentication:
1. تأكد إن الـ URLs صحيحة في Auth Settings
2. تأكد إن Environment Variables صحيحة في `.env.local`

### إذا كان فيه مشكلة في الـ Storage:
1. تأكد إن **images** bucket موجود في Storage
2. تأكد إن الـ RLS policies اتعملت صح

### إذا كان فيه مشكلة في الـ Database:
1. تأكد إن الـ SQL script اتنفذ كامل بدون errors
2. تأكد إن الـ tables اتعملت: `users`, `images`

## 📞 Need Help?
إذا حصلت أي مشكلة، ابعتلي:
1. Screenshot من الـ error
2. الـ step الي وقفت فيه
3. رسالة الـ error بالضبط

## ✅ Success Indicators
لما كل حاجة تشتغل صح، لازم تكون قادر تعمل:
- ✅ Sign up بإيميل جديد
- ✅ Login بالإيميل ده
- ✅ Upload صور في Upload 1 و Upload 2
- ✅ شوف الصور في Gallery
- ✅ Delete صور من Gallery

**Ready to go! 🚀**