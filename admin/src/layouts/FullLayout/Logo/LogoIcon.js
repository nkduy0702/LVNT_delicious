import React from "react";
import logoicn from "../../../assets/images/Logo.png";
const LogoIcon = () => {
  return (
    <img
      alt="Logo"
      src={logoicn}
      style={{
        width: "16em",
        marginLeft: "-1.5em",
      }}
    />
  );
};

export default LogoIcon;
