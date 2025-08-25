import ImageUpload from '@/components/ImageUpload'

export default function UploadPage1() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Page 1
          </h1>
          <p className="text-gray-600">
            Upload your images with detailed information
          </p>
        </div>
        
        <ImageUpload 
          title="Upload Your Images"
          description="Choose an image file, add a title and description, then upload to your collection."
        />
      </div>
    </div>
  )
}