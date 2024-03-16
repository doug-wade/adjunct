/** @type {import('tailwindcss').Config} */
import addComponentPlugin from "./src/plugins/add-component";

export default {
  content: ["./src/**/*.{html,js,jsx,css,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [addComponentPlugin],
}

