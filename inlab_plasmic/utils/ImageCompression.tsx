import imageCompression from 'browser-image-compression';

/**
 * Converts a raw or prefixed base64 string to a File object (JPEG by default).
 * @param base64 Base64 string (with or without data URL prefix)
 * @param filename Desired file name (default 'image.jpg')
 */
function base64ToFile(base64: string, filename = 'image.jpg'): File {
  let mime = 'image/jpeg';
  let base64Data = base64;

  // Add header if missing
  if (!base64.startsWith('data:')) {
    base64Data = `data:${mime};base64,${base64}`;
  }

  const [header, data] = base64Data.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  if (mimeMatch) mime = mimeMatch[1];

  const binary = atob(data);
  const u8arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; ++i) u8arr[i] = binary.charCodeAt(i);

  return new File([u8arr], filename, { type: mime });
}

/**
 * Compress a base64 image using aggressive settings.
 * Returns raw base64 string (no data URL prefix).
 * @param inputBase64 Raw/prefixed base64 string
 * @param targetMaxMB Max file size (in MB), e.g. 0.05 for 50KB
 * @param maxDim Max width/height in px (default 800; lower for more compression)
 * @param jpegQuality JPEG quality (0.1-0.9) - lower is more compressed
 */
export async function processAndCompressBase64(
  inputBase64: string,
  targetMaxMB = 0.05,
  maxDim = 800,
  jpegQuality = 0.4
): Promise<string> {
  try {
    const imageFile = base64ToFile(inputBase64);

    const options = {
      maxSizeMB: targetMaxMB,
      maxWidthOrHeight: maxDim,
      initialQuality: jpegQuality,
      useWebWorker: true,
      alwaysKeepResolution: false,
    };

    const compressedFile = await imageCompression(imageFile, options);
    const dataURL = await imageCompression.getDataUrlFromFile(compressedFile);
    const [, rawBase64] = dataURL.split(',');
    return rawBase64;
  } catch (err) {
    console.error('Compression failed:', err);
    throw err;
  }
}

/**
 * Compress multiple base64 images. Returns array of raw base64 strings.
 */
export async function compressMultipleBase64Images(
  base64Strings: string[],
  targetMaxMB = 0.05,
  maxDim = 800,
  jpegQuality = 0.4
): Promise<string[]> {
  const tasks = base64Strings.map((b64) =>
    processAndCompressBase64(b64, targetMaxMB, maxDim, jpegQuality)
  );
  return Promise.all(tasks);
}





