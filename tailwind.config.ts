import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep royal blue
        royal: {
          DEFAULT: "#1B2A6B",
          50: "#EEF1FA",
          100: "#D5DCF2",
          200: "#A9B7E4",
          300: "#7C91D6",
          400: "#4F6AC4",
          500: "#2F4699",
          600: "#1B2A6B",
          700: "#152155",
          800: "#101A43",
          900: "#0A1130",
          950: "#070C22",
        },
        // Premium gold
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FBF6E7",
          100: "#F6EAC2",
          200: "#EDD489",
          300: "#E3BF55",
          400: "#D4AF37",
          500: "#B8932A",
          600: "#937420",
          700: "#6E5718",
        },
        ink: "#0F1729",
        cream: "#FAF8F2",
        mist: "#F1F3FB",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "celestial-radial":
          "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.16), transparent 60%)",
        "royal-gradient": "linear-gradient(160deg, #152155, #0A1130)",
      },
      boxShadow: {
        premium: "0 10px 40px -12px rgba(27,42,107,0.25)",
        "premium-lg": "0 20px 60px -16px rgba(27,42,107,0.35)",
        gold: "0 8px 30px -8px rgba(212,175,55,0.4)",
      },
      keyframes: {
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "slow-spin": "slow-spin 120s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
