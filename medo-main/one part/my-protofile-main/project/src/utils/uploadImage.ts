import { supabase } from '../lib/supabaseClient';

const ALLOWED_EXT = ['png','jpg','jpeg','webp'] as const;
type AllowedExt = typeof ALLOWED_EXT[number];

export type UploadResult = {
  path: string;
  publicUrl: string;
};

function getExt(file: File): AllowedExt | null {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return (ALLOWED_EXT as readonly string[]).includes(ext) ? (ext as AllowedExt) : null;
}

function isImage(file: File) {
  return file.type.startsWith('image/');
}

export async function uploadImageToSupabase(file: File, maxSizeMB = 5): Promise<UploadResult> {
  if (!isImage(file)) throw new Error('Only image files are allowed.');
  const ext = getExt(file);
  if (!ext) throw new Error(`Allowed extensions: ${ALLOWED_EXT.join(', ')}`);
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) throw new Error(`Max size is ${maxSizeMB}MB.`);

  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const uuid = crypto.randomUUID();
  const path = `${yyyy}/${mm}/${uuid}.${ext}`;

  const { error } = await supabase.storage.from('uploads').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;

  const { data } = supabase.storage.from('uploads').getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}