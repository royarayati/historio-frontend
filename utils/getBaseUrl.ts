export const getBaseUrl = () => {
  // Priority 1: public/inlab_env.js -> window.env.INLAB_API_URL
  if (typeof window !== "undefined" && (window as any)?.env?.INLAB_API_URL) {
    const url = (window as any).env.INLAB_API_URL.replace(/\/+$/, "");
    // Safety check: never return frontend URL
    if (url && !url.includes("historio-frontend")) {
      console.log("[getBaseUrl] Using window.env.INLAB_API_URL:", url);
      return url;
    }
  }

  // Priority 2: NEXT_PUBLIC_API_BASE (SSR fallback)
  if (process.env.NEXT_PUBLIC_API_BASE) {
    const url = process.env.NEXT_PUBLIC_API_BASE.replace(/\/+$/, "");
    // Safety check: never return frontend URL
    if (url && !url.includes("historio-frontend")) {
      console.log("[getBaseUrl] Using NEXT_PUBLIC_API_BASE:", url);
      return url;
    }
    console.warn("[getBaseUrl] NEXT_PUBLIC_API_BASE points to frontend, ignoring:", url);
  }

  // Fallback backend domain (no hardcoding inside components)
  const backendUrl = "https://historio-backend.liara.run";
  console.log("[getBaseUrl] Using fallback backend URL:", backendUrl);
  return backendUrl;
};

