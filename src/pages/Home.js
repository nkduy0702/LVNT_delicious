import React, { useEffect, useState } from "react";
import Header from "../layouts/Header/Header";
import HeaderSigned from "../layouts/Header/HeaderSigned";
import Banner from "../components/Banner";
import Ingredients from "../components/Ingredients/Ingredients";
import "../styles/Home.css";

import Footer from "../layouts/Footer/Footer";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://192.168.27.1:1407/home", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* {console.log(userData)} */}
      {userData ? <HeaderSigned /> : <Header />}
      <main
        style={{
          flex: "1 0 auto",
        }}
      >
        <Banner />
        <Ingredients />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
