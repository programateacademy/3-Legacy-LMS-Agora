import React, { useEffect, useState } from "react";
import { CompetencesTable } from "../../../components/competencesTable/CompetencesTable";
import apiAgora from "../../../api";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export function DashboardCohort() {
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  let navigate = useNavigate();
  const [cohortCompetences, setCohortCompetences] = useState([]);

  const fetchCohortCompetences = async () => {
    const resCompetencesCohort = await apiAgora.get(
      `/api/agora/get-competences/${cohortID}`,
      {
        headers: { Authorization: userID },
      }
    );
    const res = resCompetencesCohort.data
    setCohortCompetences(res);
  };
  useEffect(() => {
    fetchCohortCompetences();
  }, []);
  return (
    <div>
      <CompetencesTable competencesState={cohortCompetences} />
    </div>
  );
}
