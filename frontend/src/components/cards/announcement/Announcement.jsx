import React from "react";
import styles from "./Announcement.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

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
              <FiEdit />
              <MdDeleteForever />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
