import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import apiAgora from "../../api";
import { CardBootcamp } from "../../components/cards/bootcamps/CardBootcamp.jsx";
import styles from "./Bootcamps.module.css";
export function Bootcamps() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [bootcamps, setBootcamps] = useState([]);

  const fetchBootcamps = async () => {
    const res = await apiAgora.get("/api/agora/get-bootcamps", {
      headers: { Authorization: id_user },
    });
    setBootcamps(res.data);
  };
  useEffect(() => {
    fetchBootcamps();
  }, []);
  return (
    <div className={styles.bootcamps}>
      {bootcamps.map((bootcamp, index) => (
        <CardBootcamp
          name={bootcamp.nameBootcamp}
          image={bootcamp.imageBootcamp}
          description={bootcamp.descriptionBootcamp}
          linkCohort={`/bootcamp/cohorts/${bootcamp.id}`}
          linkUpdate={`/bootcamp/update-bootcamp/${bootcamp.id}`}
          key={index}
        />
      ))}
    </div>
  );
}
