export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Image {
  id: string
  user_id: string
  title: string
  description?: string
  image_url: string
  file_path: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      images: {
        Row: Image
        Insert: Omit<Image, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Image, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}