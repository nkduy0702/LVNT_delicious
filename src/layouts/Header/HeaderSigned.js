import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/Logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar } from "@mui/material";
import Swal from "sweetalert";

import "../../styles/Layout.css";
import userimg from "../../assets/images/user/user.jpg";

const HeaderSigned = () => {
  return (
    <header
      className="header"
      style={{
        height: "78px",
      }}
    >
      <div className="container">
        <div className="logo">
          <Link to="/home">
            <img
              src={logoImg}
              alt="Logo"
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/home">Trang chủ</Link>
          <Link
            to="#"
            onClick={() => {
              Swal({
                title: "Mọi chi tiết xin liên hệ nkduy.it02@gmail.com",
                // icon: "warning",
              });
            }}
          >
            Liên hệ
          </Link>
          <Link to="/recipes">Công thức</Link>
          <Link to="/shopping-cart">Giỏ hàng</Link>
          <Link
            to="/auth"
            onClick={() => {
              window.localStorage.removeItem("token");
              alert("Đăng xuất thành công!");
            }}
          >
            Đăng xuất
          </Link>
        </div>
        <div
          className="others"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Avatar
            src={userimg}
            alt={userimg}
            sx={{
              marginBottom: "6px",
              width: "40px",
              height: "40px",
            }}
          />
        </div>
      </div>

      <Link
        to="/shopping-cart"
        style={{
          position: "Fixed",
          bottom: "6rem",
          right: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "60px",
          height: "60px",
          border: "1px solid #333333a3",
          color: "#333333a3",
          borderRadius: "50%",
        }}
      >
        <ShoppingCartIcon
          style={{
            fontSize: "36px",
          }}
        />
      </Link>
    </header>
  );
};

export default HeaderSigned;
