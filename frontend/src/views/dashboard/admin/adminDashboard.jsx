import React from "react";
import { CardBootcamp } from "../../../components/cards/bootcamps/CardBootcamp";
import { CardCohorte } from "../../../components/cards/cohort/CardCohorte";


export function AdminDashboard() {
  return (
    <div>
      <h2>Bootcamp</h2>
      <CardBootcamp/>
      <CardCohorte/>

    </div>
  );
}