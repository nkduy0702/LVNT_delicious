import React, { useEffect, useRef } from "react";
import banner from "../assets/Audio/banner.mp4";

const Banner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set loop to true to make the video loop infinitely
    if (videoRef.current) {
      videoRef.current.loop = true;
    }
  }, []);
  return (
    <div
      className="banner"
      style={{
        margin: "12px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden", // Ẩn phần nằm ngoài khung hình
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        autoPlay
        muted
        style={{
          width: "68%", // Ảnh sẽ rộng 100% của container
          height: "400px", // Chiều cao của ảnh tự động điều chỉnh để không bị biến dạng
          objectFit: "cover", // Hiển thị ảnh mà không bị biến dạng và lấp đầy toàn bộ container
          objectPosition: "center", // Hiển thị ảnh theo trục trung tâm của container
          animation: "none", // Vô hiệu hóa animation mặc định của ảnh GIF
        }}
      >
        <source src={banner} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Banner;
