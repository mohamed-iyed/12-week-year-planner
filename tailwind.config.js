module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg":
          "linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(./assets/images/hero.jpg)",
      },
    },
  },
  plugins: [],
};
