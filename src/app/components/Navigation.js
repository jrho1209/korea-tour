"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* 왼쪽 로고/타이틀 */}
      <div className="text-2xl font-bold text-violet-700 tracking-tight">
        Korea-Foodie
      </div>
      {/* 오른쪽 메뉴 */}
      <div className="flex gap-8 text-base font-medium">
        <Link href="/destination" className="text-gray-700 hover:text-violet-700 transition">
          Destination
        </Link>
        <Link href="/food" className="text-gray-700 hover:text-violet-700 transition">
          Food
        </Link>
        <Link href="/plan" className="text-gray-700 hover:text-violet-700 transition">
          Plan a trip
        </Link>
      </div>
    </nav>
  );
}