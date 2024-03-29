import "./pages.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { motion } from "framer-motion";

function LogIn({ changeLoggedIn, changeUserDetails, navigation, loggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigation();
  }, []);

  function submit() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "" || password == "") {
      document.getElementById("login_error_message").innerHTML =
        "Please fill all boxes";
      return;
    }

    axios
      .get(
        "https://hbaig745.pythonanywhere.com/user?username=" +
          username +
          "&password=" +
          password
      )
      .then((res) => {
        if (res.data.data == true) {
          axios
            .get("https://hbaig745.pythonanywhere.com/get_user_details?username=" + username)
            .then((result) => {
              changeUserDetails({
                username: username,
                name: result.data[0][1],
                email: result.data[0][2],
                number: result.data[0][3],
              });
            });
          changeLoggedIn(true);
          navigate("/");
        } else {
          document.getElementById("login_error_message").innerHTML =
            "Wrong username and password";
        }
      });
  }

  function goRegister() {
    navigate("/register");
  }

  return (
    <motion.div
      id="main"
      initial={{ opacity: 0, transition: "1s" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: "1s" }}
    >
      <div id="box">
        <div class="login-box">
          <div class="entries">
            <p id="login-text">Username</p>
            <input
              type="text"
              placeholder="Enter username"
              class="login-inputs"
              id="username"
            />
          </div>

          <div class="entries">
            <p id="login-text">Password</p>

            <input
              type="password"
              placeholder="Enter password"
              class="login-inputs"
              id="password"
            />
          </div>
          <div id="h2-div">
            <h2 id="login_error_message"></h2>
          </div>
          <div id="login-button-div">
            <button onClick={submit} id="login-buttons">
              Submit
            </button>
            <button onClick={goRegister} id="login-buttons">
              Register
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LogIn;
