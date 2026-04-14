/**
 * Surgically resolves asset paths for GitHub Pages subdirectories.
 */
export const getAssetUrl = (url: string) => {
  if (!url) return "";
  
  // If the URL is already absolute (contains http) or data-URI, return as is
  if (url.startsWith("http") || url.startsWith("data:")) return url;

  const base = import.meta.env.BASE_URL || "/";
  
  // Remove leading slash if present to prevent root-domain resolution
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  
  // Ensure we don't double up on the base path
  if (base !== "/" && cleanUrl.startsWith(base.replace(/^\/|\/$/g, ""))) {
      return url.startsWith("/") ? url : `/${url}`;
  }

  // Prepend base path
  return `${base}${cleanUrl}`;
};
