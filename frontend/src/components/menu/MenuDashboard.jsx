import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import style from "./MenuDashboard.module.css";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export function MenuDashboard() {
  const auth = useSelector((state) => state.auth);
  const { isTeacher } = auth;
  const [activeLink, setActiveLink] = useState(null);
  const handleNavLink = (index) => {
    setActiveLink(index);
  };
  const navLinks = [
    {
      text: "Estadísticas",
      route: "/anuncios",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
    {
      text: "Proyectos",
      route: "#about",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
    {
      text: "Workbooks",
      route: "#projects",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
    {
      text: "Consultas",
      route: "#studies",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
    {
      text: "Material de apoyo",
      route: "#skills",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
    {
      text: "Anuncios",
      route: "#contact",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
    {
      text: "Estudiante",
      route: "#contact",
      icon: <BsFillFileBarGraphFill className={style.icon} />,
    },
  ];
  let list = [];
  if (isTeacher) {
    list = navLinks;
  } else {
    list = navLinks.slice(0, navLinks.length-1);
  }
  return (
    <div>
      <IconContext.Provider value={{ size: 30 }}>
        <nav className={style.nav}>
          <ul className={style.ul}>
            {list.map((item, index) => {
              return (
                <Link
                  to={item.route}
                  className={
                    activeLink === index
                      ? `${style.link_active} ${style.link}`
                      : ` ${style.link}`
                  }
                  onClick={() => handleNavLink(index)}
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
