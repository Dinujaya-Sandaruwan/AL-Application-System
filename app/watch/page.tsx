"use client";

import React, { useState, useEffect } from "react";
import PassAuth from "./PassAuth";
import WatchPage from "./WatchPage";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    const storedPassword = Cookies.get("password");

    if (storedUsername && storedPassword) {
      if (storedUsername === "admin" && storedPassword === "wod#Nm^qzBg41Oy2") {
        setLoggedIn(true);
        toast.success("Successfully logged in!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }, []);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (username === "admin" && password === "wod#Nm^qzBg41Oy2") {
      setLoggedIn(true);
      Cookies.set("username", username, { expires: 7 });
      Cookies.set("password", password, { expires: 7 });
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Invalid username or password", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="watchPage">
      <ToastContainer />
      {!loggedIn ? (
        <PassAuth
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      ) : (
        <WatchPage />
      )}
    </div>
  );
};

export default Page;
