export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return new Response(JSON.stringify({ error: "query parameter required" }), { status: 400 });
  }

  const apiUrl = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}`;
  const geoRes = await fetch(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY,
      "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET,
      "Accept": "application/json",
    },
  });
  const geoData = await geoRes.json();

  if (!geoData.addresses || geoData.addresses.length === 0) {
    return new Response(JSON.stringify({ error: "No coordinates found" }), { status: 404 });
  }
  const { x, y } = geoData.addresses[0];

  // x, y만 반환
  return new Response(JSON.stringify({ x, y }), { status: 200 });
}