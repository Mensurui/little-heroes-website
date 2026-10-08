const FRAPPE_BASE_URL =
  process.env.NEXT_PUBLIC_FRAPPE_URL?.replace(/\/$/, "") || "https://api.assetflow.et";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
];

export function resolveImageUrl(url, index = 0) {
  if (!url || typeof url !== "string") {
    return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  }
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }
  if (cleanUrl.startsWith("/")) {
    return `${FRAPPE_BASE_URL}${cleanUrl}`;
  }
  return `${FRAPPE_BASE_URL}/${cleanUrl}`;
}

export function extractCoverImage(item, index = 0) {
  if (item?.cover_image) {
    return resolveImageUrl(item.cover_image, index);
  }
  if (item?.newsletter_body) {
    const match = item.newsletter_body.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return resolveImageUrl(match[1], index);
    }
  }
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export function extractExcerpt(htmlContent, maxLength = 130) {
  if (!htmlContent) return "";
  const text = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function normalizeBodyHtml(html) {
  if (!html || typeof html !== "string") return "<p>No content provided.</p>";
  let normalized = html;
  normalized = normalized.replace(/src=["']\/files\//gi, `src="${FRAPPE_BASE_URL}/files/`);
  normalized = normalized.replace(/src=["']\/private\/files\//gi, `src="${FRAPPE_BASE_URL}/private/files/`);
  return normalized;
}

export function formatPublicationDate(dateStr) {
  if (!dateStr) return "Latest Update";
  try {
    const date = new Date(dateStr.replace(" ", "T"));
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function fetchPublishedNewsletters(timeoutMs = 8000) {
  const endpoint = `${FRAPPE_BASE_URL}/api/method/little_heroes.api.v1.newsletters.list_public_newsletters`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(endpoint, {
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
      [];

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return { success: true, items: [], isFallback: true };
    }

    const enrichedItems = await Promise.all(
      rawItems.map(async (item) => {
        if (!item.name) return item;
        try {
          const detailRes = await fetch(
            `${FRAPPE_BASE_URL}/api/method/little_heroes.api.v1.newsletters.get_public_newsletter?name=${encodeURIComponent(
              item.name
            )}`,
            {
              method: "GET",
              headers: { Accept: "application/json" },
              next: { revalidate: 60 },
            }
          );
          if (detailRes.ok) {
            const detailJson = await detailRes.json();
            const detailData = detailJson?.message?.data || detailJson?.message;
            if (detailData) {
              return { ...item, ...detailData };
            }
          }
        } catch {
        }
        return item;
      })
    );

    const items = enrichedItems.map((item, idx) => ({
      id: item.name || `post-${idx}`,
      name: item.name,
      title: item.newsletter_title || "Daycare Announcement",
      date: formatPublicationDate(item.newsletter_published_at || item.creation),
      rawDate: item.newsletter_published_at || item.creation,
      author: item.newsletter_published_by || "Little Heroes Team",
      image: extractCoverImage(item, idx),
      excerpt: extractExcerpt(item.newsletter_body),
      body: normalizeBodyHtml(item.newsletter_body),
      status: item.newsletter_status || "Published",
      isLive: true,
    }));

    return { success: true, items, isFallback: false };
  } catch (err) {
    clearTimeout(timer);
    return { success: false, items: [], error: err.message, isFallback: true };
  }
}

export async function fetchNewsletterByName(nameOrId) {
  if (!nameOrId) {
    return { success: false, article: null, error: "Missing identifier" };
  }

  const endpoint = `${FRAPPE_BASE_URL}/api/method/little_heroes.api.v1.newsletters.get_public_newsletter?name=${encodeURIComponent(
    nameOrId
  )}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    clearTimeout(timer);

    if (res.ok) {
      const json = await res.json();
      const raw = json?.message?.data || json?.message;
      if (raw && raw.newsletter_title) {
        const coverImage = extractCoverImage(raw, 0);
        let cleanedBody = normalizeBodyHtml(raw.newsletter_body);
        if (coverImage) {
          cleanedBody = cleanedBody.replace(
            /<p>\s*<img[^>]*alt=["']Cover Image["'][^>]*>\s*<\/p>/i,
            ""
          );
        }

        return {
          success: true,
          article: {
            id: raw.name,
            name: raw.name,
            title: raw.newsletter_title,
            date: formatPublicationDate(raw.newsletter_published_at || raw.creation),
            rawDate: raw.newsletter_published_at || raw.creation,
            author: raw.newsletter_published_by || "Little Heroes Admissions",
            authorRole: "Care & Education Team",
            image: coverImage,
            excerpt: extractExcerpt(raw.newsletter_body),
            body: cleanedBody,
            status: raw.newsletter_status || "Published",
            category: "Daycare Bulletin",
            readTime: "4 min read",
            keyTakeaways: [
              "Official announcement directly from the Little Heroes administration.",
              "Applicable to enrolled families and registered visit requests.",
              "Feel free to contact administration with any questions."
            ],
            isLive: true,
          },
        };
      }
    }
  } catch (err) {
  }

  try {
    const { siteData } = await import("@/data/siteData");
    const found = siteData.blog.articles.find(
      (a) =>
        String(a.id) === String(nameOrId) ||
        a.slug === nameOrId ||
        a.name === nameOrId
    );

    if (found) {
      return { success: true, article: found, isFallback: true };
    }

    return {
      success: true,
      article: siteData.blog.articles[0],
      isFallback: true,
    };
  } catch (err) {
    return { success: false, article: null, error: err.message };
  }
}
