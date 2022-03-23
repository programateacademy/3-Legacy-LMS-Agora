import React from "react";
import styles from "./CardBootcamp.module.css"

export function CardBootcamp() {
  return (
  <body>
  <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.image}>
        <img src = "https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg" alt="logo bootcamps"/>
      </div>
      <div className={styles.content}>
        <h3>This is content</h3>
        <p>DIn publishing and graphic design,              commonly used to demonstrate the visual         form of a document or a typeface without         relying on meaningful content.</p>
        
      </div>
    </div>    
  </div>
  </body>
  );
}