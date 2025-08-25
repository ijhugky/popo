# Image Upload App

A full-stack image upload application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🔐 **Authentication**: User signup, login, and logout
- 📤 **Image Upload**: Two dedicated upload pages for organizing images
- 🖼️ **Image Gallery**: View, manage, and delete uploaded images
- 🗄️ **Database**: PostgreSQL database with Row Level Security
- 💾 **Storage**: Supabase Storage for image files
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS
- 📱 **Responsive**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Storage, Auth)
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API
3. Run the SQL commands from `supabase-setup.sql` in your Supabase SQL Editor

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── login/            # Login page
│   ├── upload-1/         # First upload page
│   ├── upload-2/         # Second upload page
│   ├── gallery/          # Image gallery page
│   └── layout.tsx        # Root layout with navigation
├── components/            # React components
│   ├── AuthContext.tsx   # Authentication context
│   ├── LoginForm.tsx     # Login/signup form
│   ├── ImageUpload.tsx   # Image upload component
│   ├── ImageGallery.tsx  # Image gallery component
│   └── Navigation.tsx    # Navigation bar
├── lib/                   # Utility functions
│   └── supabase.ts       # Supabase client configuration
└── types/                 # TypeScript type definitions
    └── database.ts        # Database schema types
```

## Database Schema

### Users Table
- `id`: UUID (references auth.users)
- `email`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Images Table
- `id`: UUID (primary key)
- `user_id`: UUID (references users)
- `title`: TEXT
- `description`: TEXT (optional)
- `image_url`: TEXT
- `file_path`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## Features in Detail

### Authentication
- Email/password signup and login
- Automatic user profile creation
- Secure session management
- Protected routes

### Image Upload
- **Page 1**: Detailed upload with title and description
- **Page 2**: Quick upload interface
- File validation (images only)
- Automatic file naming and organization
- Progress feedback

### Image Management
- View all uploaded images
- Delete unwanted images
- Responsive grid layout
- Image metadata display

### Security
- Row Level Security (RLS) enabled
- Users can only access their own data
- Secure file storage with user isolation
- Protected API endpoints

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
