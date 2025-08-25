import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'

export default async function HomePage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Image Upload App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload, manage, and organize your images with ease
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Upload Images
              </h2>
              <p className="text-gray-600 mb-4">
                Use our two dedicated upload pages to organize your images by category or purpose.
              </p>
              <div className="space-y-2">
                <a
                  href="/upload-1"
                  className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Go to Upload Page 1
                </a>
                <a
                  href="/upload-2"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Go to Upload Page 2
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                View Gallery
              </h2>
              <p className="text-gray-600 mb-4">
                Browse all your uploaded images, delete unwanted ones, and manage your collection.
              </p>
              <a
                href="/gallery"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
