import React from "react";
import logo from "../../assets/logos/programateLogo.png";
import projectIcon from "../../assets/icons/projects-icon.svg";
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import forumIcon from "../../assets/icons/forum-icon.svg";
import { Link } from "react-router-dom";
import "./headerFooterStyles.css";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserLink from "./UserLink";
import "./UserLink.css";

export default function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

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
        <div className="headerContainer">
          {isLogged ? (
            <div className="hamburguerMenu">
              <Dropdown>
                <Dropdown.Toggle
                  variant="bg-transparent"
                  id="dropdown-basic"
                  className="caret-off"
                >
                  <i style={{ margin: "0" }} className="fas fa-bars"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <span>
                      <img src={dashboardIcon} alt="dashboardIcon" />
                    </span>
                    <Link className="linksHeader" to="/">
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span>
                      <img src={projectIcon} alt="projectIcon" />
                    </span>
                    <Link className="linksHeader" to="/proyectos">
                      Proyectos
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span>
                      <img src={forumIcon} alt="forumIcon" />
                    </span>
                    <Link className="linksHeader" to="/anuncios">
                      Anuncios
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            ""
          )}

          <img className="Logo" src={logo} alt="Prográmate-logotipo" />
          {isLogged ? (
            <div className="iconsContainer">
              <div>
                <img src={dashboardIcon} alt="dashboardIcon" />
                <Link className="linksHeader" to="/">
                  Dashboard
                </Link>
              </div>

              <div>
                <img src={projectIcon} alt="projectIcon" />
                <Link className="linksHeader" to="/proyectos">
                  Proyectos
                </Link>
              </div>

              <div>
                <img src={forumIcon} alt="forumIcon" />
                <Link className="linksHeader" to="/anuncios">
                  Anuncios
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}

          {isLogged ? (
            <UserLink user={user} handleLogout={handleLogout} />
          ) : (
            <Link  className="link-singIn" to="/login">
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
