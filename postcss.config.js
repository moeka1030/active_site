// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},  // ← こちらを使う
    autoprefixer: {},            // ← 既に入れている autoprefixer
  },
};
