import Image from "next/image";
import NaverMap from "./components/NaverMap";

export default function Home() {
  return (
    <>
    <h1>Korea Tour에 오신 것을 환영합니다!</h1>
      <p>아래는 서울 지도 예시입니다.</p>
      <NaverMap />
    </>
  );
}
