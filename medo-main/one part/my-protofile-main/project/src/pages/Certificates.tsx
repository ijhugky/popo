import { useState, useRef } from 'react';
import { uploadImageToSupabase, UploadResult } from '../utils/uploadImage';

export default function CertificatesPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPick = () => inputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setPublicUrl(null);
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const result: UploadResult = await uploadImageToSupabase(file, 5);
      setPublicUrl(result.publicUrl);
    } catch (err: any) {
      setError(err?.message ?? 'Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const copyLink = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    alert('Copied!');
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Certificates (Upload)</h1>

      <div className="rounded-2xl border p-4 space-y-4 shadow-sm">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={onFileChange}
        />

        <button
          onClick={onPick}
          className="px-4 py-2 rounded-xl border hover:shadow w-full"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Select image'}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {previewUrl && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Preview</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="preview" className="rounded-xl border max-h-72 object-contain" />
          </div>
        )}

        {publicUrl && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Public URL</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={publicUrl}
                className="flex-1 rounded-lg border px-3 py-2 text-sm"
              />
              <button onClick={copyLink} className="px-3 py-2 rounded-lg border hover:shadow">
                Copy
              </button>
            </div>
            <img src={publicUrl} alt="uploaded" className="rounded-xl border max-h-72 object-contain" />
          </div>
        )}

        <p className="text-xs text-gray-400">
          Allowed: png, jpg, jpeg, webp — Max 5MB.
        </p>
      </div>
    </div>
  );
}