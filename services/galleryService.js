const FRAPPE_BASE_URL =
  process.env.NEXT_PUBLIC_FRAPPE_URL?.replace(/\/$/, "") || "https://api.assetflow.et";

export function resolveImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }
  if (cleanUrl.startsWith("/")) {
    return `${FRAPPE_BASE_URL}${cleanUrl}`;
  }
  return `${FRAPPE_BASE_URL}/${cleanUrl}`;
}

export async function fetchWebsiteGalleryImages({
  category = "All",
  page = 1,
  pageSize = 24,
  timeoutMs = 7000,
} = {}) {
  const url = new URL(
    `${FRAPPE_BASE_URL}/api/method/little_heroes.api.v1.website_gallery_images.list_website_gallery_images`
  );

  if (category && category !== "All") {
    url.searchParams.append("category", category);
  }
  url.searchParams.append("page", String(page));
  url.searchParams.append("page_size", String(pageSize));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    clearTimeout(timer);

    if (!res.ok) {
      return { success: false, items: [], error: `HTTP ${res.status}`, isFallback: true };
    }

    const json = await res.json();
    const rawItems =
      json?.message?.items ||
      json?.message?.data?.items ||
      (Array.isArray(json?.message?.data) ? json.message.data : []) ||
      (Array.isArray(json?.message) ? json.message : []) ||
      [];

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return { success: true, items: [], isFallback: true };
    }

    const items = rawItems.map((item, idx) => ({
      id: item.name || `gallery-${idx}`,
      title: item.image_title || "Daycare Activity",
      category: item.image_categories || "General",
      image: resolveImageUrl(item.gallery_image),
      caption: item.image_caption || "",
      isLive: true,
    }));

    return { success: true, items, isFallback: false };
  } catch (err) {
    clearTimeout(timer);
    return { success: false, items: [], error: err.message, isFallback: true };
  }
}
