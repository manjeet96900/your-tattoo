import { createClient } from '@supabase/supabase-js';

// Supabase Project Credentials
export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || 'https://cuywzwiclntitgwlrqts.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eXd6d2ljbG50aXRnd2xycXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NTAwMDQsImV4cCI6MjEwNjQyNjAwNH0.LJweXRcXq8TAtgrxHxC-bM38kH7I7QaCGQW3I5Qbu0U';

export const SUPABASE_BUCKET =
  import.meta.env?.VITE_SUPABASE_BUCKET || 'your-tattoo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Upload an image directly to the Supabase Storage bucket 'your-tattoo'.
 * Automatically removes ANY previous files for this slot (including older
 * timestamps or different file formats) so only ONE file ever exists per slot.
 */
export async function uploadImageToSupabase(
  fileOrBlob: Blob | File,
  fileName: string,
  slotId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const cleanSlot = slotId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const ext = (fileName.split('.').pop() || 'jpg').toLowerCase().replace('jpeg', 'jpg');

    // Deterministic single file path per slot: slots/{slotId}.{ext}
    const targetPath = `slots/${cleanSlot}.${ext}`;

    // 1. Find and DELETE all existing files for this slot in the bucket
    try {
      const { data: existingFiles, error: listError } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .list('slots', { limit: 100 });

      if (!listError && existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles
          .filter((f) => {
            const name = f.name;
            // Match any file belonging to this slot
            return (
              name === `${cleanSlot}.${ext}` ||
              name.startsWith(`${cleanSlot}.`) ||
              name.startsWith(`${cleanSlot}-`)
            );
          })
          .map((f) => `slots/${f.name}`);

        if (filesToDelete.length > 0) {
          await supabase.storage.from(SUPABASE_BUCKET).remove(filesToDelete);
        }
      }
    } catch (cleanupErr) {
      console.warn('Storage cleanup notice:', cleanupErr);
    }

    // 2. Upload new file with upsert
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(targetPath, fileOrBlob, {
        cacheControl: '0',
        upsert: true,
      });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(data.path);

    // Cache-busting timestamp parameter ensures the browser displays the new image immediately
    const freshUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

    return { success: true, url: freshUrl };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}

/**
 * Fetch all image slot overrides from Supabase database table `site_images`.
 */
export async function fetchSupabaseOverrides(): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from('site_images')
      .select('slot_id, image_url');

    if (error) {
      console.warn(
        'Could not fetch site_images from Supabase (run SQL schema if table not created):',
        error.message
      );
      return {};
    }

    const map: Record<string, string> = {};
    if (data && Array.isArray(data)) {
      data.forEach((row) => {
        if (row.slot_id && row.image_url) {
          map[row.slot_id] = row.image_url;
        }
      });
    }
    return map;
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return {};
  }
}

/**
 * Save or update a single slot override in Supabase `site_images`.
 * slot_id is the primary key, so it automatically replaces the previous image URL.
 */
export async function saveSlotToSupabase(
  slotId: string,
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('site_images')
      .upsert(
        {
          slot_id: slotId,
          image_url: imageUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slot_id' }
      );

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}
