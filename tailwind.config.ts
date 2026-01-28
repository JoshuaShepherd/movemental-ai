import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f0f4f0",
          100: "#e2e9e2",
          200: "#c5d3c5",
          300: "#a8bda8",
          400: "#8ba78b",
          500: "#6e916e",
          600: "#587458",
          700: "#425742",
          800: "#2c3a2c",
          900: "#161d16",
          950: "#0f140f",
        },
        "bright-snow": {
          50: "#f1f3f3",
          100: "#e3e8e8",
          200: "#c7d1d1",
          300: "#acb9b9",
          400: "#90a2a2",
          500: "#748b8b",
          600: "#5d6f6f",
          700: "#465353",
          800: "#2e3838",
          900: "#171c1c",
          950: "#0c0e0e",
        },
        "scarlet-rush": {
          50: "#faebeb",
          100: "#f5d6d7",
          200: "#eaaeaf",
          300: "#e08587",
          400: "#d55d5f",
          500: "#cb3437",
          600: "#a22a2c",
          700: "#7a1f21",
          800: "#511516",
          900: "#290a0b",
          950: "#140505",
        },
        "velvet-orchid": {
          50: "#f4eef7",
          100: "#e8dcef",
          200: "#d1b9df",
          300: "#ba96cf",
          400: "#a373bf",
          500: "#8c50af",
          600: "#70408c",
          700: "#543069",
          800: "#382046",
          900: "#1c1023",
          950: "#0e0812",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
