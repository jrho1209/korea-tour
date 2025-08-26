// Hero.js
"use client";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="flex min-h-[60vh] bg-white">
            {/* 왼쪽 텍스트 영역 */}
            <div className="flex flex-col justify-center flex-1 px-10 py-8 md:pl-20 md:py-8 mt-[-40px]">
                <div className="inline-block bg-violet-100 text-violet-700 px-5 py-2 rounded-full text-base mb-6">
                    Aním aute id magna aliqua ad ad non deserunt sunt.{" "}
                    <a href="#" className="text-violet-700 underline font-medium ml-1">
                        Read more →
                    </a>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    <span className="text-red-500">Warning:</span> Your Diet <br />Starts Tomorrow
                </h1>
                <p className="text-base text-gray-500 mb-8 max-w-xl">
                    Craving something local in South Korea?
                    We bring you Korea’s hidden food gems — from sizzling street food to secret neighborhood restaurants only locals know.
                    And because good food deserves good memories, we’ll show you the best spots to explore nearby.
                    Eat. Walk. Discover. Repeat.
                </p>
                <div className="flex gap-4">
                    <button className="">
                        Get started
                    </button>
                    <a href="#" className="flex items-center text-violet-700 font-medium text-base hover:underline">
                        Learn more →
                    </a>
                </div>
            </div>
            {/* 오른쪽 이미지 영역 */}
            <div
                className="flex-1 relative min-h-[320px] overflow-hidden bg-gray-200 hidden md:block"
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
            >
                <Image
                    src="/hero/hero-img.jpg"
                    alt="Hero background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </section>
    );
}