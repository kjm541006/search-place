import "./App.css";
import KakaoMapScriptLoader from "./components/Map/KakaoMapScriptLoader";
import KakaoMap from "./components/Map/KakaoMap";

function App() {
  return (
    <KakaoMapScriptLoader>
      <KakaoMap />
    </KakaoMapScriptLoader>
  );
}

export default App;
