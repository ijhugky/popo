-- Complete Supabase Setup Script
-- Run this script in your Supabase SQL Editor

-- Step 1: Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Step 2: Create users table (if not exists)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 3: Create images table
CREATE TABLE IF NOT EXISTS public.images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  upload_source TEXT DEFAULT 'upload-1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 4: Enable RLS on tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 6: Create RLS policies for images table
CREATE POLICY "Users can view own images" ON public.images
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own images" ON public.images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own images" ON public.images
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own images" ON public.images
  FOR DELETE USING (auth.uid() = user_id);

-- Step 7: Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true) 
ON CONFLICT (id) DO NOTHING;

-- Step 8: Create storage policies
CREATE POLICY "Users can upload own images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own images" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'images' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view public images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Step 9: Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 10: Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 11: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_images_user_id ON public.images(user_id);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON public.images(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Step 12: Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 13: Create triggers for updated_at
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_images_updated_at
  BEFORE UPDATE ON public.images
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Verification queries (run these to check if everything is working)
-- SELECT * FROM public.users LIMIT 5;
-- SELECT * FROM public.images LIMIT 5;
-- SELECT * FROM storage.buckets WHERE id = 'images';