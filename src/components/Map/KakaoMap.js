import React, { useRef, useEffect, useState } from "react";
import classes from "./KakaoMap.module.css";

const KakaoMap = () => {
  const kakaoMapRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    let gpsOptions = {
      enableHighAccuracy: true,
    };
    return new Promise((resolve, rejected) => {
      navigator.geolocation.getCurrentPosition(resolve, rejected, gpsOptions);
    });
  };

  const onLoadCurrentPosition = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const position = await getCurrentLocation();
      let lat = position.coords.latitude;
      let log = position.coords.longitude;
      console.log(position);
      console.log(lat, log);

      let centerPoint = new window.kakao.maps.LatLng(lat, log);
      const options = {
        center: centerPoint,
        level: 4,
      };
      new window.kakao.maps.Map(kakaoMapRef.current, options);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (!kakaoMapRef.current) {
  //     return;
  //   }
  //   const options = {
  //     center: new window.kakao.maps.LatLng(37.5666805, 126.9784147),
  //     level: 4,
  //   };
  //   new window.kakao.maps.Map(kakaoMapRef.current, options);
  // }, []);

  useEffect(() => {
    if (!kakaoMapRef.current) {
      return;
    }
    const drawMap = async () => {
      setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    drawMap();
  }, []);

  return (
    <>
      <div ref={kakaoMapRef} className={classes.kakaomap} />
      <button onClick={onLoadCurrentPosition}>현재 위치로 이동</button>
      {loading && <span>현 위치 불러오는 중...</span>}
    </>
  );
};

export default KakaoMap;
