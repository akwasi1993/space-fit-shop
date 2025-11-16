-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'creator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  cover_image_url TEXT NOT NULL,
  intro_video_url TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  created_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0
);

-- Enable RLS on programs
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Programs policies
CREATE POLICY "Programs are viewable by everyone"
ON public.programs FOR SELECT
USING (true);

CREATE POLICY "Creators and admins can insert programs"
ON public.programs FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'creator') OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Creators can update their own programs"
ON public.programs FOR UPDATE
TO authenticated
USING (
  created_by_user_id = auth.uid() OR
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Creators can delete their own programs"
ON public.programs FOR DELETE
TO authenticated
USING (
  created_by_user_id = auth.uid() OR
  public.has_role(auth.uid(), 'admin')
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add trigger for programs updated_at
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for program content
INSERT INTO storage.buckets (id, name, public) 
VALUES ('program-covers', 'program-covers', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('program-videos', 'program-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for program covers
CREATE POLICY "Program covers are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'program-covers');

CREATE POLICY "Authenticated creators can upload program covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'program-covers' AND
  (public.has_role(auth.uid(), 'creator') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Creators can update their program covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'program-covers' AND
  (public.has_role(auth.uid(), 'creator') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Creators can delete their program covers"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'program-covers' AND
  (public.has_role(auth.uid(), 'creator') OR public.has_role(auth.uid(), 'admin'))
);

-- Storage policies for program videos
CREATE POLICY "Program videos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'program-videos');

CREATE POLICY "Authenticated creators can upload program videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'program-videos' AND
  (public.has_role(auth.uid(), 'creator') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Creators can update their program videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'program-videos' AND
  (public.has_role(auth.uid(), 'creator') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Creators can delete their program videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'program-videos' AND
  (public.has_role(auth.uid(), 'creator') OR public.has_role(auth.uid(), 'admin'))
);

-- User roles policies
CREATE POLICY "User roles are viewable by the user themselves"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all user roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));