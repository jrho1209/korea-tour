"use client";

import { useState } from "react";
import FoodSearch from "../components/FoodSearch";
import PlaceMap from "../components/PlaceMap";

// Food 페이지
export default function FoodPage() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
      <h1>음식점 검색 페이지</h1>
      <FoodSearch onPlaceClick={(address, title) => 
        setSelectedPlace({ address, title })} />
      {selectedPlace && 
        <PlaceMap 
          address={selectedPlace.address} 
          title={selectedPlace.title} 
        />}
    </div>
  );
}