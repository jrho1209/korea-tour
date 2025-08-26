"use client";

import { useState, useRef, useEffect } from "react";

export default function NaverMap() {
  const [inputValue, setInputValue] = useState("");
  const [mapUrl, setMapUrl] = useState(null);
  const [coords, setCoords] = useState(null); // 동적 지도용 좌표
  const mapRef = useRef(null);

  // 네이버 지도 JS SDK 동적 로드
  useEffect(() => {
    if (coords) {
      console.log("coords 변경됨:", coords);
      if (!window.naver) {
        console.log("네이버 지도 스크립트 로드 시작");
        const script = document.createElement("script");
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY}`;
        script.async = true;
        script.onload = () => {
          console.log("네이버 지도 스크립트 로드 완료");
          renderMap();
        };
        script.onerror = () => {
          console.error("네이버 지도 스크립트 로드 실패");
        };
        document.body.appendChild(script);
      } else {
        console.log("window.naver 이미 존재, renderMap 실행");
        renderMap();
      }
    }
    // eslint-disable-next-line
  }, [coords]);

  const renderMap = () => {
    console.log("renderMap 호출됨");
    if (!window.naver) {
      console.error("window.naver 없음");
      return;
    }
    if (!coords) {
      console.error("coords 없음");
      return;
    }
    console.log("지도 렌더링 시작", coords);
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(coords.y, coords.x),
      zoom: 10,
    });
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(coords.y, coords.x),
      map,
    });
    console.log("지도 렌더링 완료");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      console.log("검색 요청:", inputValue);
      const res = await fetch(`/api/geocode?query=${inputValue}`);
      const data = await res.json();

      if (data && data.x && data.y) {
        console.log("좌표 검색 성공:", data);
        setMapUrl(`/api/staticmap?x=${data.x}&y=${data.y}`);
        setCoords({ x: data.x, y: data.y }); // 동적 지도용 좌표 저장
      } else {
        alert("지도를 찾을 수 없습니다.");
        setMapUrl(null);
        setCoords(null);
      }
    } catch (err) {
      console.error("Static Map API 호출 실패:", err);
      alert("지도를 불러오는 데 실패했습니다.");
      setMapUrl(null);
      setCoords(null);
    }
  };

  return (
    <div>
      <h1>장소 검색 후 정적/동적 지도 보기</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="장소 이름을 입력하세요"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          검색
        </button>
      </form>
      {mapUrl && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <strong>정적 지도</strong>
            <img
              src={mapUrl}
              alt="네이버 정적 지도"
              style={{ width: "100%", maxWidth: 600, height: 400, border: "1px solid #ccc" }}
            />
          </div>
          <div>
            <strong>동적 지도</strong>
            <div
              id="map"
              ref={mapRef}
              style={{ width: "100%", height: 400, border: "1px solid #4caf50" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
