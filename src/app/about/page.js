import NaverMap from "../components/NaverMap";

export default function AboutPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>About</h1>
      <p>
        이 사이트는 한국의 다양한 관광지를 소개하고, 네이버 지도를 활용해 위치를 쉽게 확인할 수 있도록 만든 프로젝트입니다.
      </p>
      <ul>
        <li>관광지 검색 및 지도 이동</li>
        <li>간단한 위치 정보 제공</li>
        <li>Next.js App Router 기반</li>
      </ul>
      <p style={{ marginTop: "2rem", color: "#888" }}>
        © 2025 Korea Tour Project
      </p>

      <NaverMap />
    </div>
  );
}