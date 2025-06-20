// pages/_app.jsx
import "../styles/globals.css";  // ← グローバルCSS の読み込み
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
