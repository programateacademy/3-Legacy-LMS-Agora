import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import style from "./MenuDashboard.module.css";
import {
  BsFillFileCodeFill,
  BsFileRichtextFill,
} from "react-icons/bs";
import { AiOutlineFundProjectionScreen, AiFillProject } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { RiFileUserFill } from "react-icons/ri";
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
      route: "/estadisitica",
      icon: <AiOutlineFundProjectionScreen className={style.icon} />,
    },
    {
      text: "Proyectos",
      route: "#about",
      icon: <AiFillProject className={style.icon} />,
    },
    {
      text: "Workbooks",
      route: "#projects",
      icon: <BsFillFileCodeFill className={style.icon} />,
    },
    {
      text: "Consultas",
      route: "#studies",
      icon: <FiFileText className={style.icon} />,
    },
    {
      text: "Material de apoyo",
      route: "#skills",
      icon: <BsFileRichtextFill className={style.icon} />,
    },
    {
      text: "Anuncios",
      route: "#contact",
      icon: <MdAnnouncement className={style.icon} />,
    },
    {
      text: "Estudiante",
      route: "#contact",
      icon: <RiFileUserFill className={style.icon} />,
    },
  ];
  let list = [];
  if (isTeacher) {
    list = navLinks;
  } else {
    list = navLinks.slice(0, navLinks.length - 1);
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
