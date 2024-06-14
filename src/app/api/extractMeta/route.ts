import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return new Response("URL is required");
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const headContent = getHeadContent(html);
    const ogTitle = getMetaTagContent(html, "og:title");
    const ogImage = getMetaTagContent(html, "og:image");
    const ogDescription = getMetaTagContent(html, "og:description");
    return new Response(
      JSON.stringify({
        headContent,
        ogTitle,
        ogImage,
        ogDescription,
      }),
    );
  } catch (error) {
    console.error("Failed to fetch the webpage", error);
    return new Response("Failed to fetch the webpage");
  }
}

function getHeadContent(html: string) {
  // Extract content inside the <head> tag using regex
  const match = /<head[^>]*>([\s\S.]*)<\/head>/im.exec(html);
  return match ? match[1] : "";
}

function getMetaTagContent(html: string, property: string) {
  // Extract content of a specific meta tag using regex
  const regex = new RegExp(
    `<meta\\s+property="${property}"\\s+content="([^"]*)"\\s*\\/?>`,
    "i",
  );
  const match = regex.exec(html);
  return match ? match[1] : "";
}
