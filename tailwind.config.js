/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
  ],
  theme: {
    extend: {
      padding: {
        main: "200px",
      },
      animation: {
        "rotate-slow": "spin 2s linear",
      },
      height: {
        "small-fit": "30px",
      },
      gap: {
        22: "5.25rem",
      },
      gridTemplateColumns: {
        "2s": "repeat(2, minmax(0, 320px))",
        "header-list":
          "150px minmax(200px,300px) 150px minmax(200px, 1fr) 150px 100px",
        "people-list": "150px minmax(200px, 300px) 300px 150px 100px 20px",
      },
      screens: {
        sms: { max: "780px" },
      },
      fontSize: {
        "form-label": [
          "20px",
          {
            lineHeight: "27px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
            color: "26355C",
          },
        ],
      },
      colors: {
        purple: "#9378FF",
        "purple-dark": "#7F5FFF",
        "light-pink": "#FBEEFF",
        "darker-pink": "#F0BEFF",
        grey: "#99879D",
        "grey-1": "#EBEBEB",
        "near-black": "#120E21",
        "red-error": "#FF7979",
        "pulse-off": "#475569",
        "pulse-on": "#64748b",
        // Artile
        // Green
        "green-50": "#F3F7F6",
        "green-100": "#E7F0EE",
        "green-150": "#DBE8E5",
        "green-200": "#C4D8D3",
        "green-300": "#A0C1B9",
        "green-400": "#7CAA9F",
        "green-500": "#5D8E82",
        "green-600": "#466B62",
        // Blue from 50 to 600
        "blue-50": "#EDF3F5",
        "blue-100": "#DBE7EB",
        "blue-150": "#C9DBE1",
        "blue-200": "#A6C4CD",
        "blue-300": "#70A0AF",
        "blue-400": "#568999",
        "blue-500": "#456E7B",
        "blue-600": "#33525C",
        // Yellow from 50 to 600
        "yellow-50": "#FCF9EF",
        "yellow-100": "#FBF6E8",
        "yellow-150": "#FAF4E0",
        "yellow-200": "#F7EED1",
        "yellow-300": "#F4E8C1",
        "yellow-400": "#EFDDA2",
        "yellow-500": "#E4C664",
        "yellow-600": "#22514E",
        // Success 1 to 3
        "success-1": "#B1D6B2",
        "success-2": "#E9DDE9",
        "success-3": "#2E5930",
        // Warning 1 to 3
        "warning-1": "#F2E4B1",
        "warning-2": "#E2B822",
        "warning-3": "#A58205",
        // error 1 to 3
        "error-1": "#E09898",
        "error-2": "#D04E4E",
        "error-3": "#901313",
        // background
        "green-bg": "#33525C",
        "yellow-bg": "#F7EED1",
      },
    },
  },
  plugins: [],
};
