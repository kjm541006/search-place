import React, { useRef, useEffect } from "react";
import classes from "./KakaoMap.module.css";

const KakaoMap = () => {
  const kakaoMapRef = useRef(null);

  const getCurrentLocation = () => {
    let gpsOptions = {
      enableHighAccuracy: true,
    };
    return new Promise((resolve, rejected) => {
      navigator.geolocation.getCurrentPosition(resolve, rejected, gpsOptions);
    });
  };

  useEffect(() => {
    if (!kakaoMapRef.current) {
      return;
    }

    const drawMap = async () => {
      try {
        let position = await getCurrentLocation();
        let lat = position.coords.latitude;
        let log = position.coords.longitude;

        console.log(lat, log);

        let centerPoint = new window.kakao.maps.LatLng(lat, log);
        const options = {
          center: centerPoint,
          level: 4,
        };
        new window.kakao.maps.Map(kakaoMapRef.current, options);
      } catch (error) {
        console.log(error);
      }
    };

    drawMap();
  }, []);

  return (
    <div>
      <div ref={kakaoMapRef} className={classes.kakaomap} />
    </div>
  );
};

export default KakaoMap;
