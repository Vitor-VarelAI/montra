import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f0e8",
        ink: "#1a1a1a",
      },
    },
  },
  plugins: [],
}

export default config