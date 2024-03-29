/* dependecnias y componentes */
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazy-load";
import UserLink from "./UserLink";
import { HamburguerMenu } from "./HamburguerMenu";
import { MenuDashboard } from "../menu/MenuDashboard";
/* assets y styles */
import "./UserLink.css";
import style from "./Header.module.css";
import logo from "../../assets/logos/programate-academy-blancos.png";

export function Header() {
  const auth = useSelector((state) => state.auth);
  const menu = useSelector((state) => state.menu);
  const [open, setOpen] = useState(false);

  const { menuView } = menu;
  const { user, isLogged, isTeacher, isStudent } = auth;

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
    {isLogged ? (
      <header>
        <div className={style.headerContainer}>
          {isLogged && (isStudent || isTeacher) ? (
            <>
              {menuView ? (
                <div className={style.hamburguerMenu}>
                  <HamburguerMenu open={open} handleClick={handleClick} />
                </div>
              ) : null}
              <div className={!open ? "closeMenu" : "openMenu"}>
                <MenuDashboard open={open} setOpen={setOpen} />
              </div>
            </>
          ) : (
            ""
          )}
          <LazyLoad className={style.Logo}>
            <img src={logo} alt="Prográmate-logotipo" />
          </LazyLoad>
          {isLogged ? (
            <UserLink user={user} handleLogout={handleLogout} />
          ) : (
            <Link className={style.link_singIn} to="/login">
              <i
                className="ri-user-line icon-signIn"
              >Ingresar</i>
            </Link>
          )}
        </div>
      </header>
      ) : ''}
      <div className={style.container}>
        <Outlet />
      </div>
      </>
  );
}
