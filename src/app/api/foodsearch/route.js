export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let query = searchParams.get("query");
  console.log("foodsearch API 호출 원본 쿼리:", query);

  if (!query) {
    console.log("쿼리 파라미터 없음");
    return new Response(JSON.stringify({ error: "query parameter required" }), { status: 400 });
  }

  // "맛집" 단어가 포함되어 있는지 확인하고, 없으면 추가
  if (!query.includes("맛집")) {
    query = `${query} 맛집`;
    console.log("맛집 키워드 추가된 쿼리:", query);
  }

  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=10&start=1`;
  console.log("네이버 검색 API 요청 URL:", apiUrl);

  const res = await fetch(apiUrl, {
    headers: {
      "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("네이버 검색 API 에러:", error);
    return new Response(JSON.stringify({ error }), { status: res.status });
  }

  const data = await res.json();
  console.log("네이버 검색 API 응답:", data);
  return new Response(JSON.stringify(data), { status: 200 });
}