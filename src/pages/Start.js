import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./pages.css";
//import Redux
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../_actions/user";
//import Component
import { register } from "../config/api";

function Start(props) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  //Sign In
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("failed");
  //Sign Up
  const [regName, setRegName] = useState();
  const [regEmail, setRegEmail] = useState();
  const [regPassword, setRegPassword] = useState();
  const [regRePassword, setRegRePassword] = useState();
  //message
  const [regMessage, setMessage] = useState();

  //function Sign In
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
    if (password == null || email == null) {
      setPassword("failed");
    }
  };

  const login = useSelector(state => state.login.token);
  const dispatch = useDispatch();

  const onClickLogin = () => {
    const data = {
      email: email,
      password: password
    };
    dispatch(postLogin(data));
    window.setTimeout(() => doLogin(), 1000);
  };

  const doLogin = () => {
    const token = login.token;
    console.log(token);
    if (login.token !== undefined) {
      localStorage.setItem("token", token);
      window.location = "/Home";
    }
  };

  //function Sign Up
  const onRegName = e => {
    setRegName(e.target.value);
  };

  const onRegEmail = e => {
    setRegEmail(e.target.value);
  };

  const onRegPassword = e => {
    setRegPassword(e.target.value);
  };

  const onRegRePassword = e => {
    setRegRePassword(e.target.value);
  };

  const onSignUp = () => {
    const data = {
      name: regName,
      email: regEmail,
      password: regPassword,
      password_confirmation: regRePassword
    };
    register(data).then(response => {
      if (response.token !== null) {
        window.location = "/Home";
      } else {
        alert("Anda gagal register!!");
      }
    });
  };

  //control modal
  const signinOpen = () => {
    setLoginOpen(true);
  };

  const signupOpen = () => {
    setRegOpen(true);
  };

  const signinLinkOpen = () => {
    setMessage("");
    setLoginOpen(false);
    setRegOpen(true);
  };

  const signupLinkOpen = () => {
    setMessage("");
    setRegOpen(false);
    setLoginOpen(true);
  };

  const handleClose = type => {
    if (type == "login") {
      setLoginOpen(false);
      setMessage("");
    } else {
      setRegOpen(false);
      setMessage("");
    }
  };

  return (
    <div style={{ backgroundColor: "aqua" }}>
      <nav className="app-nav">
        <h2>Cakra Tech</h2>
        <Link to="/Signin" className="nav-link">
          <button type="button" onClick={signinOpen}>
            LOG IN
          </button>
        </Link>
        <Link to="/Signin" className="nav-link">
          <button type="button" onClick={signupOpen}>
            REGISTER
          </button>
        </Link>
      </nav>
      {/* Log In */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modalStart"
        open={loginOpen}
        onClose={() => handleClose("login")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={loginOpen}>
          <div className="signin regist">
            <h1>Log In</h1>
            {regMessage != null && (
              <p style={{ color: "red", fontSize: "17px" }}>{regMessage}</p>
            )}
            <form>
              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChangeEmail}
                  placeholder="  Email"
                ></input>
              </div>
              <br></br>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChangePassword}
                  placeholder="  Password"
                ></input>
              </div>
              <br></br>
              <div>
                <button type="button" onClick={onClickLogin}>
                  {/* <Link to="/Home" className="start"> */}
                  log in
                  {/* </Link> */}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <p>Don't have an account yet? </p>
                <div onClick={signinLinkOpen} className="sign">
                  Register
                </div>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
      {/* Registration */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modalStart"
        open={regOpen}
        onClose={() => handleClose("register")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={regOpen}>
          <div className="signup regist">
            <h1>Register</h1>
            {regMessage != null && (
              <p style={{ color: "red", fontSize: "17px" }}>{regMessage}</p>
            )}
            <form action="" method="">
              <div>
                <input
                  type="text"
                  name="name"
                  id="fullname"
                  placeholder="  Your Name"
                  onChange={onRegName}
                ></input>
              </div>
              <br></br>
              <div>
                <input
                  type="text"
                  name="email"
                  id="username"
                  placeholder="  Your Email"
                  onChange={onRegEmail}
                ></input>
              </div>
              <br></br>
              <div>
                <input
                  type="password"
                  name="password"
                  id="email"
                  placeholder="  Password"
                  onChange={onRegPassword}
                ></input>
              </div>
              <br></br>
              <div>
                <input
                  type="password"
                  name="repassword"
                  id="password"
                  placeholder="  Password Confirmation"
                  onChange={onRegRePassword}
                ></input>
              </div>
              <br></br>
              <div>
                <button type="button" onClick={onSignUp}>
                  register
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <p>Have an account?</p>
                <div onClick={signupLinkOpen} className="sign">
                  log in
                </div>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
      <div className="start-page"></div>
    </div>
  );
}

export default Start;
