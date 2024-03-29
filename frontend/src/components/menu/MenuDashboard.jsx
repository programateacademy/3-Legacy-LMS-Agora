import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./MenuDashboard.module.css";
import "../header/UserLink.css";
import { IconContext } from "react-icons";

export function MenuDashboard({ open, setOpen }) {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const cohortID = params.id;
  const { isTeacher } = auth;
  const [activeLink, setActiveLink] = useState(1);
  const navLinks = [
    {
      text: "Estadísticas",
      route: `/dashboard/${cohortID}/statistics`,
      icon: <i className={`ri-bar-chart-2-fill ${style.icon}`}></i>,
    },
    {
      text: "Proyectos",
      route: `/dashboard/${cohortID}/projects`,
      icon: <i className={`ri-folders-fill ${style.icon}`}></i>,
    },
    {
      text: "Workbooks",
      route: `/dashboard/${cohortID}/workbooks`,
      icon: <i className={`ri-draft-fill ${style.icon}`}></i>,
    },
    {
      text: "Consultas",
      route: `/dashboard/${cohortID}/queries`,
      icon: <i className={`ri-chat-smile-3-line ${style.icon}`}></i>,
    },
    {
      text: "Anuncios",
      route: `/dashboard/${cohortID}/announcements-cohort`,
      icon: <i className={`ri-notification-3-line ${style.icon}`}></i>,
    },
    {
      text: "Estudiantes",
      route: `/dashboard/${cohortID}/students`,
      icon: <i className={`ri-user-follow-line ${style.icon}`}></i>,
    },
    {
      text: "Cohortes",
      route: "/",
      icon: <i className={`ri-list-check-2 ${style.icon}`}></i>,
    },
  ];
  let list = [];
  if (isTeacher) {
    list = navLinks;
  } else {
    list = navLinks.slice(0, navLinks.length - 2);
  }
  const handleNavLink = (index) => {
    setActiveLink(index);
    if (open) {
      setOpen(!open);
    }
  };
  return (
    <div>
      <IconContext.Provider value={{ size: 30 }}>
        <nav className={style.nav}>
          <ul className={style.ul}>
            {list.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.route}
                  className={
                    activeLink === index
                      ? `${style.link_active} ${style.link}`
                      : ` ${style.link}`
                  }
                  onClick={() => handleNavLink(index, item.text)}
                >
                  <div>{item.icon}</div>
                  <span className={style.nav_text}>{item.text}</span>
                </Link>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}