import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/Logo.png";
import LoginIcon from "@mui/icons-material/Login";
import Swal from "sweetalert";

import "../../styles/Layout.css";

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
        </div>
        <Link
          to="/auth"
          style={{
            color: "#333333a3",
            "&:hover": {
              color: "#333",
            },
          }}
        >
          <LoginIcon />
        </Link>
      </div>
    </header>
  );
};

export default HeaderSigned;
