/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#05060a',
          900: '#080a10',
          850: '#0b0e16',
          800: '#10131d',
          700: '#171b28',
        },
        fg: {
          DEFAULT: '#e9ecf2',
          muted:   '#a0a8b8',
          dim:     '#6b7385',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        floaty:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        ping2:    { '0%': { transform: 'scale(1)', opacity: '0.7' }, '80%,100%': { transform: 'scale(2.4)', opacity: '0' } },
        draw:     { from: { strokeDashoffset: '400' }, to: { strokeDashoffset: '0' } },
        blink:    { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        fadeUp:   { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:  { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty:  'floaty 6s ease-in-out infinite',
        ping2:   'ping2 2s cubic-bezier(0,0,0.2,1) infinite',
        draw:    'draw 2.2s ease-out forwards',
        blink:   'blink 1s step-end infinite',
        fadeUp:  'fadeUp 0.4s ease forwards',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
