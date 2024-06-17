import React from "react";
import "../styles/index.css";
import logoImg from "../assets/images/Logo.png";
import indexPic from "../assets/images/indexPic.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <div
        className="container_index"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="img_index">
          <img
            src={indexPic}
            alt=""
            style={{
              display: "block",
              width: "calc(100vw - 45vw)",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="container_others"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
            width: "calc(100vw - 55vw)",
            height: "100vh",
          }}
        >
          <div
            className="logoAndDesc"
            style={{
              marginTop: "-4rem",
              padding: "12px 4vw",
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img
              src={logoImg}
              alt=""
              style={{
                position: "relative",
                left: "6vw",
                width: 400,
                height: "auto",
              }}
            ></img>
            <h1
              style={{
                fontWeight: 700,
                lineHeight: 1.2,
                padding: "0 0 2rem 0 ",
                borderBottom: "1px solid #f254393b",
              }}
            >
              Chào mừng đến với trang web của chúng tôi
            </h1>
            <span
              style={{
                fontStyle: "italic",
                marginTop: "2rem",
              }}
            >
              nơi bạn có thể tìm thấy những nguyên liệu tươi ngon và chất lượng
              cao để tạo ra những món ăn ngon tuyệt. Với sự đa dạng phong phú từ
              rau củ, thực phẩm đóng gói, đến các loại gia vị, chúng tôi cam kết
              cung cấp cho bạn những sản phẩm tốt nhất từ các nguồn cung cấp
              đáng tin cậy. Hãy khám phá và tạo ra những bữa ăn thú vị và độc
              đáo với sự trợ giúp của chúng tôi.
            </span>
          </div>
          <Link
            to="/auth"
            style={{
              textDecoration: "none",
            }}
          >
            <button className="cssbuttons-io-button btn_index">
              Get started
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
