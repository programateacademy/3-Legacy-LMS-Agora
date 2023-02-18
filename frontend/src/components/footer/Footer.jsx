import React from "react";
import logo from "../../assets/logos/Logo-negro-completo.png";
import a from "../../assets/logos/a.png";
import style from "./Footer.module.css";
import LazyLoad from "react-lazy-load";

export function Footer() {
  return (
    <>
      <footer>
        <div className={style.footerContainer}>
          <LazyLoad className="a">
            <img src={a} alt="a" className="ani"/>
          </LazyLoad>
          <div className="help">
            <svg width="221" height="209" viewBox="0 0 221 209" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M254.9 1.44998C230.78 -3.75002 188.08 5.42998 175.73 38.68C159.05 83.61 182.55 121.37 167.86 160.87C150.19 208.39 58.97 256.92 0.23999 204.2L60.41 305.03L329.57 126.57L254.9 1.44998Z" fill="url(#paint0_linear_295_7329)" />
              <defs>
                <linearGradient id="paint0_linear_295_7329" x1="18.9686" y1="53.8029" x2="230.358" y2="205.352" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD45D" />
                  <stop offset="1" stopColor="#FC4707" />
                </linearGradient>
              </defs>
              <svg width="360" height="190" viewBox="0 0 75 174" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M82.31 11.62C76.22 21.13 74.79 37.68 91.05 55.07C104.75 69.71 108.37 89.79 101.74 99.72C97.2 106.52 90.01 111.15 82.48 114.34C74.19 117.86 65.26 119.86 56.27 120.21C51.27 120.41 46.26 120.1 41.28 120.57C28.21 121.79 15.76 128.54 7.59999 138.82C5.23999 141.8 3.21998 145.08 1.99998 148.68C-0.930017 157.37 1.10999 166.87 3.15999 175.81C20.13 166.83 38.34 160.49 56.38 153.92C89.75 141.76 122.79 128.67 155.43 114.66C151.57 98.33 145.5 82.61 139.44 66.96C134.54 54.28 129.64 41.61 124.74 28.93C122.29 22.59 119.84 16.26 117.39 9.92C115.77 5.74 114.64 2.96 109.74 1.59C102.82 -0.349996 88.71 1.62 82.31 11.62Z" fill="url(#paint0_linear_295_7333)" />
                <defs>
                  <linearGradient id="paint0_linear_295_7333" x1="242.087" y1="167.032" x2="73.3897" y2="95.7875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FCD45D" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                </defs>
              </svg>
              <svg width="221" height="209" viewBox="0 0 221 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M323.29 24.3099C326.36 138.31 214.08 107.32 175.64 142C137.19 176.68 141.98 248.66 41.12 266C41.12 266 -34.48 176.37 21.15 132.73C76.78 89.09 217.82 123.82 253.88 76.5899C278.47 44.3799 265.22 0.819946 265.22 0.819946L323.29 24.3099Z" fill="url(#paint0_linear_295_7337)" />
                <defs>
                  <linearGradient id="paint0_linear_295_7337" x1="122.539" y1="122.52" x2="453.876" y2="261.019" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FCD45D" />
                    <stop offset="1" stopColor="#FC4707" />
                  </linearGradient>
                </defs>
              </svg>
            </svg>
            <p className={style.sign}>
            Todos los derechos reservados <br/>2023© 
            </p>
          </div>
          <LazyLoad >
              <img src={logo} alt="logo" className={style.logos}/>
          </LazyLoad>
        </div>
      </footer>
    </>
  );
}
