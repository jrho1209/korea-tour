export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  if (!x || !y) {
    return new Response("x, y required", { status: 400 });
  }

  const staticMapUrl = `https://maps.apigw.ntruss.com/map-static/v2/raster?center=${x},${y}&level=16&w=600&h=400&markers=type:d|size:mid|pos:${x} ${y}`;
  const imageRes = await fetch(staticMapUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY,
      "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET,
    },
  });

  const imageBuffer = await imageRes.arrayBuffer();
  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}