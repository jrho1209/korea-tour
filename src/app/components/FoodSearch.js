"use client";

import { useState } from "react";

export default function FoodSearch({ onPlaceClick }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch(`/api/foodsearch?query=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      if (data.items) {
        setResults(data.items);
      } else {
        alert("검색 결과가 없습니다.");
      }
    } catch (err) {
      alert("검색 실패");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>음식점 검색</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="음식점 이름 또는 키워드"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          검색
        </button>
      </form>
      {loading && <div>검색 중...</div>}
      <ul>
        {results.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "1rem", cursor: "pointer" }}
              onClick={() => onPlaceClick(item.roadAddress || item.address, item.title)}>
            <strong dangerouslySetInnerHTML={{ __html: item.title }} />
            <div>{item.roadAddress || item.address}</div>
            <div>{item.telephone}</div>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              네이버 상세보기
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}