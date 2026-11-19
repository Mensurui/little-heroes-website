import { fetchPublishedNewsletters } from "@/services/blogService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchPublishedNewsletters();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { success: false, items: [], error: err.message, isFallback: true },
      { status: 500 }
    );
  }
}
