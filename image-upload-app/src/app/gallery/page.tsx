import ImageGallery from '@/components/ImageGallery'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Image Gallery
          </h1>
          <p className="text-gray-600">
            View and manage all your uploaded images
          </p>
        </div>
        
        <ImageGallery />
      </div>
    </div>
  )
}