// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 또는 프로젝트 구조에 맞게
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gochujang-red': '#B71C1C',
        'hanok-black': '#2E2E2E',
        'baekja-ivory': '#F8F4EC',
        'doenjang-brown': '#8D6E63',
        'cheongja-blue': '#5C7F9A',
        'yuja-yellow': '#FFCB05',
        'kimchi-orange': '#EF6C00',
      },
    },
  },
  // ...기존 설정 유지
}
