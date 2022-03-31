import React, { useState, useEffect } from "react";
import logo from "../../assets/logos/programate-academy-color-.png";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UserLink from "./UserLink";
import "./UserLink.css";
import style from "./Header.module.css";

import { HamburguerMenu } from "./HamburguerMenu";
import { MenuDashboard } from "../menu/MenuDashboard";

export function Header() {
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const { user, isLogged, isTeacher, isStudent } = auth;
  const [url, setUrl] = useState("");
  const urlView = window.location.href.split('/').reverse()[0]

  useEffect(() => {
    setUrl(urlView)
  });

  const handleLogout = async () => {
    try {
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("loggedAgoraUser");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <header>
        <div className={style.headerContainer}>
          {isLogged && (isStudent || isTeacher && url) ? (
            <>
              <div className={style.hamburguerMenu}>
                <HamburguerMenu open={open} handleClick={handleClick} />
              </div>
              <div className={!open ? "closeMenu" : "openMenu"}>
                <MenuDashboard open={open} setOpen={setOpen} />
              </div>
            </>
          ) : (
            ""
          )}
          <span className={style.Logo}>
            <img src={logo} alt="Prográmate-logotipo" />
          </span>
          {isLogged ? (
            <UserLink user={user} handleLogout={handleLogout} />
          ) : (
            <Link className={style.link_singIn} to="/login">
              <i
                className="fas fa-user icon-signIn"
                style={{ marginRight: "1rem" }}
              ></i>
              Ingresar
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
