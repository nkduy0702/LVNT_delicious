import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Auth.css";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import Snackbar from "../components/SnackbarMsg";

const Auth = () => {
  const [active, setActive] = useState("container_auth");
  const activeIN = () => {
    setActive("container_auth active");
  };
  const activeUP = () => {
    setActive("container_auth");
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const [name, setName] = useState("");
  const [emailSU, setEmailSU] = useState("");
  const [passSU, setPassSU] = useState("");
  const [emailSI, setEmailSI] = useState("");
  const [passSI, setPassSI] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passSUError, setPassSUError] = useState("");

  //   REGEX VALIDATION
  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const validatePassword = (input) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(input);
  };

  const checkEmail = (e) => {
    const ipEmail = e.target.value;
    setEmailSU(ipEmail);
    if (!validateEmail(ipEmail) && ipEmail !== "") {
      setEmailError("Định dạng email không hợp lệ");
    } else {
      setEmailError("");
    }
  };
  const checkPassword = (e) => {
    const ipPass = e.target.value;
    setPassSU(ipPass);
    if (!validatePassword(ipPass) && ipPass !== "") {
      setPassSUError(
        "Mật khẩu phải có ít nhất 6 ký tự và chứa ít nhất một chữ cái và một chữ số"
      );
    } else {
      setPassSUError("");
    }
  };

  //   SIGN IN / SIGN UP
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.27.1:1407/auth/signin",
        {
          email: emailSI,
          password: passSI,
        }
      );

      if (response.data.status) {
        const { token } = response.data;
        console.log(token);
        localStorage.setItem("token", token);
        setSnackbarMsg(response.data.msg);
        setSnackbarOpen(true);
        window.location.href = "/home";
      } else {
        setSnackbarMsg(response.data.msg);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Có vấn đề với yêu cầu của bạn:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(emailSU)) {
      setEmailError("Địa chỉ Email không hợp lệ");
      setSnackbarMsg("Định dạng email không hợp lệ");
      setSnackbarOpen(true);
    } else {
      if (!validatePassword(passSU)) {
        setPassSUError(
          "Mật khẩu phải có ít nhất 6 ký tự và chứa ít nhất một chữ cái và một chữ số"
        );
        setSnackbarMsg(
          "Mật khẩu phải có ít nhất 6 ký tự và chứa ít nhất một chữ cái và một chữ số"
        );
        setSnackbarOpen(true);
      } else {
        try {
          const response = await axios.post(
            "http://192.168.27.1:1407/auth/signup",
            {
              name: name,
              email: emailSU,
              password: passSU,
            }
          );

          if (response.data.status) {
            activeIN();
            setSnackbarMsg(response.data.msg);
            setSnackbarOpen(true);
          } else {
            setSnackbarMsg(response.data.msg);
            setSnackbarOpen(true);
          }
        } catch (error) {
          console.error("Có vấn đề với yêu cầu của bạn:", error);
        }
      }
    }
  };

  // useEffect Snackbar

  useEffect(() => {
    let timeout;
    if (snackbarOpen) {
      timeout = setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000); // Đóng snackbar sau 2 giây
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [snackbarOpen]);

  return (
    <div id="body_auth">
      <div className={active} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <Link className="icon">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </Link>
              <Link className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link className="icon">
                <FontAwesomeIcon icon={faGithub} />
              </Link>
              <Link className="icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
            </div>
            <span>or use your email for registeration.</span>
            <div className="wrapper">
              <input
                required
                type="text"
                name="name"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="label" htmlFor="name">
                Name
              </label>
            </div>
            <div className="wrapper">
              <input
                required
                type="email"
                name="email"
                placeholder=""
                value={emailSU}
                onChange={checkEmail}
              />
              {emailError && (
                <span
                  className="error"
                  style={{
                    display: "block",
                    maxHeight: "8px",
                    position: "relative",
                    top: "-8px",
                    left: 10,
                    color: "red",
                    transition: "all 0.3s ease",
                  }}
                >
                  {emailError}
                </span>
              )}
              <label className="label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="wrapper">
              <input
                required
                type="password"
                name="pass"
                placeholder=""
                value={passSU}
                onChange={checkPassword}
              />
              {passSUError && (
                <span
                  className="error"
                  style={{
                    display: "block",
                    maxHeight: "24px",
                    position: "relative",
                    top: "-8px",
                    left: 10,
                    color: "red",
                    transition: "all 0.3s ease",
                    lineHeight: "18px",
                  }}
                >
                  {passSUError}
                </span>
              )}
              <label className="label" htmlFor="pass">
                Password
              </label>
            </div>

            <button type="submit" onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
        </div>

        {/* SIGN IN */}

        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <Link className="icon">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </Link>
              <Link className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link className="icon">
                <FontAwesomeIcon icon={faGithub} />
              </Link>
              <Link className="icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
            </div>
            <span>or use your email password.</span>
            <div className="wrapper">
              <input
                required
                type="email"
                name="email"
                placeholder=""
                value={emailSI}
                onChange={(e) => setEmailSI(e.target.value)}
              />
              <label className="label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="wrapper">
              <input
                required
                type="password"
                name="pass"
                placeholder=""
                value={passSI}
                onChange={(e) => setPassSI(e.target.value)}
              />
              <label className="label" htmlFor="pass">
                Password
              </label>
            </div>
            <Link>Forget your password?</Link>
            <button type="submit" onClick={handleSignIn}>
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1> Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={activeIN}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1> Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden" id="register" onClick={activeUP}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar isOpen={snackbarOpen} msg={snackbarMsg}></Snackbar>
    </div>
  );
};

export default Auth;
