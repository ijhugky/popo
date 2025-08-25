import ImageUpload from '@/components/ImageUpload'

export default function UploadPage2() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Page 2
          </h1>
          <p className="text-gray-600">
            Another upload interface for organizing your images
          </p>
        </div>
        
        <ImageUpload 
          title="Quick Image Upload"
          description="Fast and simple image upload for quick additions to your collection."
        />
      </div>
    </div>
  )
}