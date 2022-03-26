import React from "react";
import logo from "../../assets/logos/programate-academy-color-.png";

import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

import UserLink from "./UserLink";
import "./UserLink.css";
import style from "./Header.module.css";

export function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged, isTeacher, isStudent } = auth;

  const handleLogout = async () => {
    try {
      // await axios.get('/user/logout')
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("loggedAgoraUser");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <header>
        <div className={style.headerContainer}>
          {isLogged && (isStudent || isTeacher)? (
            <div className={style.hamburguerMenu}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="bg-transparent"
                  id={style.dropdown_basic}
                  className={style.caret_off}
                >
                  <i style={{ margin: "0" }} className="fas fa-bars"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <span>
                    </span>
                    <Link className={style.linksHeader} to="/">
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span>
                    </span>
                    <Link className={style.linksHeader} to="/proyectos">
                      Proyectos
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span>
                    </span>
                    <Link className={style.linksHeader} to="/anuncios">
                      Anuncios
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
