"use client";

import { useEffect, useState, useRef } from "react";

export default function NaverMap() {
  const [inputValue, setInputValue] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.naver) {
      // 초기 지도 설정
      mapRef.current = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 기본 좌표
        zoom: 10,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const res = await fetch(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
          inputValue
        )}`,
        {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY,
            "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NAVER_MAP_API_SECRET,
          },
        }
      );

      const data = await res.json();

      if (data.addresses.length > 0) {
        const { x, y, roadAddress } = data.addresses[0];
        const latLng = new window.naver.maps.LatLng(y, x);

        // 지도 중심 이동
        mapRef.current.setCenter(latLng);
        mapRef.current.setZoom(15);

        // 기존 마커 있으면 제거
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // 마커 표시
        markerRef.current = new window.naver.maps.Marker({
          position: latLng,
          map: mapRef.current,
        });

        alert(`${roadAddress} 위치로 이동했어요.`);
      } else {
        alert("좌표를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("Geocoding API 호출 실패:", err);
    }
  };

  return (
    <div>
      <h1>장소 검색 후 지도 이동</h1>

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

      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
}
