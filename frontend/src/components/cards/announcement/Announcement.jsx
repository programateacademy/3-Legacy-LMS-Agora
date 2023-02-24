import React from "react";
import styles from "./Announcement.module.css";

export function AnnouncementCard(props) {
  const { titleAnnouncement, textAnnouncement /* updatedAt */ } = props;
  return (
    <div style={{ marginBottom: "100px" }}>
      <div className={styles.announceContainer}>
        <h4>{titleAnnouncement}</h4>
        <div className={styles.textAnnouncementContainer}>
          <p>{textAnnouncement}</p>
          <small>
            {/* <b>{new Date(updatedAt).toLocalDateString()}</b> */}
          </small>
          <div className={styles.icon}>
            <h6>Fecha</h6>
            <div className={styles.icons}>
              <i className="ri-edit-line"></i>
              <i className="ri-delete-bin-5-line"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
