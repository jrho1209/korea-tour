"use client";
import { useEffect, useRef, useState } from "react";

// 예시 지역 정보 (실제 데이터에 맞게 수정)
const REGION_INFO = {
  "Seoul": {
    name: "서울",
    description: "대한민국의 수도, 문화와 경제의 중심지.",
    image: "/regions/seoul.jpg",
  },
  "Busan": {
    name: "부산",
    description: "아름다운 해변과 항구도시.",
    image: "/regions/busan.jpg",
  },
  "Daejeon": {
    name: "대전",   
    description: "과학과 기술의 중심지, 대덕연구개발특구가 위치.",
    image: "/regions/dajeon.jpg",
    },
  // ...다른 지역 추가
};

export default function Region() {
  const chartRef = useRef(null);
  // 대전을 기본 hover로!
  const [hoveredRegion, setHoveredRegion] = useState("Daejeon");
  // 대전의 대략적 위치(지도에 맞게 조정 가능)
  const [overlayPos, setOverlayPos] = useState({ x: 100 , y: 100 });

  useEffect(() => {
    let root;
    async function loadMap() {
      const am5 = await import("@amcharts/amcharts5");
      const am5map = await import("@amcharts/amcharts5/map");
      const am5geodata_southKoreaLow = (await import("@amcharts/amcharts5-geodata/southKoreaLow")).default;

      root = am5.Root.new(chartRef.current);

      root.setThemes([am5.Theme.new(root)]);

      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "none",
          panY: "none",
          wheelX: "none",
          wheelY: "none",
          projection: am5map.geoMercator()
        })
      );

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_southKoreaLow
        })
      );

      const baseColor = am5.color(0xF8F4EC); // 백자 아이보리
      const hoverColor = am5.color(0xB71C1C); // 고수장 레드

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        fill: baseColor,
        stroke: am5.color(0x8D6E63), // 된장 브라운
        strokeWidth: 1
      });

      polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
        ev.target.animate({
          key: "fill",
          to: hoverColor,
          duration: 650,
          easing: am5.ease.cubic
        });
        const regionName = ev.target.dataItem.dataContext.name;
        setHoveredRegion(regionName);

        // 마우스 위치로 오버레이 위치 지정 (중앙 정렬 등 원하는 방식으로 조정 가능)
        const pointer = ev.target._display._eventPoint || { x: 120, y: 120 };
        setOverlayPos({ x: pointer.x, y: pointer.y });
      });

      polygonSeries.mapPolygons.template.events.on("pointerout", function(ev) {
        ev.target.animate({
          key: "fill",
          to: baseColor,
          duration: 650,
          easing: am5.ease.cubic
        });
        setHoveredRegion(null);
      });

      // 라벨 시리즈
      const labelSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

      polygonSeries.events.on("datavalidated", function() {
        polygonSeries.mapPolygons.each(function(polygon) {
          var coords = polygon.visualCentroid();
          labelSeries.pushDataItem({
            longitude: coords[0],
            latitude: coords[1],
            name: polygon.dataItem.dataContext.name
          });
        });
      });

      labelSeries.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{name}",
            fontWeight: "700",
            fill: am5.color(0x2E2E2E), // 한옥 블랙
            fontSize: 12,
            centerX: am5.p50,
            centerY: am5.p50,
            background: am5.Rectangle.new(root, {
              fill: am5.color(0xF8F4EC),
              cornerRadiusTL: 4,
              cornerRadiusTR: 4,
              cornerRadiusBL: 4,
              cornerRadiusBR: 4
            }),
            shadowColor: am5.color(0x000000),
            shadowBlur: 4,
            shadowOffsetX: 1,
            shadowOffsetY: 1
          })
        });
      });
    }

    loadMap();

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, []);

  // 오버레이 카드 렌더링
  const regionData = hoveredRegion && REGION_INFO[hoveredRegion];

  return (
    <div className="w-full h-[80vh] bg-[#F8F4EC] rounded-xl shadow mt-10 relative">
      <div ref={chartRef} className="w-full h-full" />
      {regionData && (
        <div
          className="absolute z-20 bg-white rounded-2xl shadow-xl p-6 w-[340px] animate-fade-in pointer-events-none"
          style={{
            left: overlayPos.x,
            top: overlayPos.y,
            minWidth: 260,
            maxWidth: "90vw"
          }}
        >
          <img
            src={regionData.image}
            alt={regionData.name}
            className="w-full h-36 object-cover rounded-xl mb-4"
          />
          <div className="text-sm text-gray-500 mb-1">Explore</div>
          <div className="text-2xl font-bold text-hanok-black mb-1">{regionData.name}</div>
          <div className="text-gray-600">{regionData.description}</div>
        </div>
      )}
    </div>
  );
}