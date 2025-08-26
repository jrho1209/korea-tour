"use client";
import { useEffect, useRef, useState } from "react";

export default function PlaceMap({ address, title }) {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("PlaceMap useEffect 진입:", { address });
    if (!address) {
      console.log("주소가 없음. 렌더링 중단");
      setError("주소가 필요합니다");
      return;
    }

    setIsLoading(true);
    setError(null);

    // 네이버 지도 SDK가 없으면 로드
    if (!window.naver) {
      console.log("window.naver 없음. 스크립트 동적 로드 시작");
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY}&submodules=geocoder`;
      script.async = true;
      script.onload = () => {
        console.log("네이버 지도 스크립트 로드 완료");
        renderMap();
      };
      script.onerror = () => {
        console.error("네이버 지도 스크립트 로드 실패");
        setError("지도를 불러올 수 없습니다");
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      console.log("window.naver 이미 존재. renderMap 실행");
      renderMap();
    }

    function renderMap() {
      console.log("renderMap 호출됨");
      if (!window.naver || !mapRef.current) {
        console.error("window.naver 또는 mapRef.current 없음");
        setError("지도를 초기화할 수 없습니다");
        setIsLoading(false);
        return;
      }

      // 주소로 좌표 검색
      window.naver.maps.Service.geocode(
        {
          query: address
        },
        function(status, response) {
          setIsLoading(false);

          if (status !== window.naver.maps.Service.Status.OK) {
            console.error("네이버 지오코딩 실패:", status);
            setError("주소를 찾을 수 없습니다");
            return;
          }

          const result = response.v2.addresses[0];
          if (!result) {
            console.error("검색 결과 없음");
            setError("주소를 찾을 수 없습니다");
            return;
          }

          const latlng = new window.naver.maps.LatLng(result.y, result.x);
          console.log("검색된 좌표:", latlng);

          const map = new window.naver.maps.Map(mapRef.current, {
            center: latlng,
            zoom: 18
          });

          const marker = new window.naver.maps.Marker({
            position: latlng,
            map: map,
            title: title || address
          });

          // 정보창 추가 (선택사항)
          const infoWindow = new window.naver.maps.InfoWindow({
            content: `<div style="padding:10px;width:200px;text-align:center;">
                        <strong>${title || '위치'}</strong><br>
                        <span>${address}</span>
                      </div>`
          });

          window.naver.maps.Event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
          });

          console.log("지도 및 마커 렌더링 완료");
        }
      );
    }

    return () => {
      // 클린업 코드 (필요시)
    };
  }, [address, title]);

  return (
    <div>
      {isLoading && <div style={{ textAlign: 'center', padding: '10px' }}>지도를 불러오는 중...</div>}
      {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</div>}
      <div
        ref={mapRef}
        style={{ 
          width: "100%", 
          height: 400, 
          border: "1px solid #4caf50", 
          margin: "1rem 0",
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      />
    </div>
  );
}