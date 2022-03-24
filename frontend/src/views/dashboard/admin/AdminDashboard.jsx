import React from "react";
import { CreateBootcamp } from "../../bootcamps/createBootcamp/CreateBootcamp";
import { CreateCohorte } from "../../cohort/createCohort/CreateCohorte";


export function AdminDashboard() {
  return (
    <div>
      <h2>Bootcamp</h2>
      <CreateBootcamp/>
      <CreateCohorte/>
    </div>
  );
}