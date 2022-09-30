import React, { useEffect, useState } from "react";

const KAKAO_MAP_APP_KEY = "386414c90d86922d56ed375b9f691458";

const KakaoMapScriptLoader = (props) => {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      setMapScriptLoaded(false);
    };

    document.getElementById("root")?.appendChild(script);
  }, []);

  return <div>{mapScriptLoaded ? props.children : <div>지도를 가져오는 중입니다.</div>}</div>;
};

export default KakaoMapScriptLoader;
