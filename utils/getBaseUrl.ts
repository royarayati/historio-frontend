export const getBaseUrl = () => {
  // Priority 1: public/inlab_env.js -> window.env.INLAB_API_URL
  if (typeof window !== "undefined" && (window as any)?.env?.INLAB_API_URL) {
    return (window as any).env.INLAB_API_URL.replace(/\/+$/, "");
  }

  // Priority 2: NEXT_PUBLIC_API_BASE (SSR fallback)
  if (process.env.NEXT_PUBLIC_API_BASE) {
    return process.env.NEXT_PUBLIC_API_BASE.replace(/\/+$/, "");
  }

  // Fallback backend domain (no hardcoding inside components)
  return "https://historio-backend.liara.run";
};

