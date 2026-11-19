import { fetchWebsiteGalleryImages } from "@/services/galleryService";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "24", 10);

    const data = await fetchWebsiteGalleryImages({ category, page, pageSize });
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { success: false, items: [], error: err.message, isFallback: true },
      { status: 500 }
    );
  }
}
