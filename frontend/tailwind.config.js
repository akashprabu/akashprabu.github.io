/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      margin: {
        title: "6rem",
      },
      hueRotate: {
        170: "170deg",
      },
      saturate: {
        75: "0.75",
        25: "0.25",
        300: "3",
      },
      grayscale: {
        25: "25%",
        50: "50%",
      },
      sepia: {
        50: "0.5",
      },
      width: {
        75: "75%",
      },
      boxShadow: {
        "nav-custom": "0 8px 6px -6px #02080e",
        mainbox: "0 1rem 1.2rem 0 #02080e, 0 0.8rem 2rem 0 #02080e",
      },
      fontFamily: {
        body: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
      },
    },
  },
  daisyui: {
    logs: true,
    darkTheme: "darkMode",
    themes: [
      {
        darkmode: {
          primary: "#2680C5",
          secondary: "#0F3858",
          accent: "#ADD8E6",
          neutral: "#0E1E2A",
          border: "#0DCAF0",
          dull: "#808080",
          "base-100": "#051420",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
