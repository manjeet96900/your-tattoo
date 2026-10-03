/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Compresses large images before converting to data URL to preserve browser memory
 * and avoid exceeding browser localStorage quotas, while keeping razor-sharp resolution.
 */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      // If file is already small (under 800KB), return directly
      if (file.size <= 800 * 1024) {
        resolve(result);
        return;
      }

      // Otherwise, optimize using canvas
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          // Max dimension 1920px for high-definition editorial clarity
          const MAX_DIM = 1920;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(result);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Use image/webp if supported, or image/jpeg
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const compressedDataUrl = canvas.toDataURL(mimeType, 0.88);
          resolve(compressedDataUrl);
        } catch {
          // If canvas tainted or fails, fallback to raw data URL
          resolve(result);
        }
      };

      img.onerror = () => {
        resolve(result);
      };

      img.src = result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Attempts to upload to the server's /api/upload-image endpoint.
 * Returns the permanent uploaded path (/uploads/...) if successful, or null if server endpoint is unavailable.
 */
export async function uploadImageToServer(
  dataUrl: string,
  fileName: string,
  slotId: string
): Promise<string | null> {
  try {
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataUrl,
        fileName: fileName.replace(/[^a-zA-Z0-9._-]/g, '_'),
        slotId,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data && data.url) {
      return data.url;
    }
    return null;
  } catch {
    // Dev server upload not reachable, client data URL fallback takes precedence
    return null;
  }
}
