import { useEffect, useState } from "react";
import style from "../ProfileStudent/TableStudent.module.css";
import apiAgora from "../../api/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useProjects from "../../hooks/useProjects";

function TableStudent(props) {
  const { projects, queries, workbooks, userID } = props;
  const auth = useSelector((state) => state.auth);
  const projectInfoData = useSelector((state) => state.projects.data);
  const [queryInfo, setQueryInfo] = useState([]);
  const [workbookInfo, setWorkbookInfo] = useState([]);

  const [toggleState, setToggleState] = useState(1);

  const { getProject } = useProjects();

  const fetchActivity = async (activity, url, id) => {
    const res = await apiAgora.get(`/api/agora/get-${activity}/${url}`, {
      headers: { Authorization: id },
    });
    if (activity === "workbook") {
      setWorkbookInfo((prev) => [
        ...prev,
        { name: res.data.titleWorkbook, id: url },
      ]);
    }
    if (activity === "query") {
      setQueryInfo((prev) => [...prev, { name: res.data.titleQuery, id: url }]);
    }
  };
  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    projects.forEach((id) => getProject(id, userID));
  }, [projects]);
  useEffect(() => {
    queries.map((item) => {
      fetchActivity("query", item, userID);
    });
  }, [queries]);
  useEffect(() => {
    workbooks.map((item) => {
      fetchActivity("workbook", item, userID);
    });
  }, [workbooks]);

  const projectInfo = Object.keys(projectInfoData).map(
    (projectId) => projectInfoData[projectId]
  );

  return (
    <div className={style.container}>
      <div className={style.bloc_tabs}>
        <button
          className={
            toggleState === 1
              ? `${style.tabs} ${style.active_tabs}`
              : style.tabs
          }
          onClick={() => toggleTab(1)}
        >
          Proyectos
        </button>
        <button
          className={
            toggleState === 2
              ? `${style.tabs} ${style.active_tabs}`
              : style.tabs
          }
          onClick={() => toggleTab(2)}
        >
          Workbooks
        </button>
        <button
          className={
            toggleState === 3
              ? `${style.tabs} ${style.active_tabs}`
              : style.tabs
          }
          onClick={() => toggleTab(3)}
        >
          Consultas
        </button>
      </div>
      <div className={style.content_tabs}>
        <div
          className={
            toggleState === 1
              ? `${style.content}  ${style.active_content}`
              : style.content
          }
        >
          <h2 className={style.proyectrow}>Proyectos Entregados</h2>
          <hr />
          {projectInfo.map((item) => (
            <div className={style.name}>
              <h4>{item.name}</h4>
              <div className={style.links}>
                <Link to={"/project/view-project/" + item.id}>
                  Ver Proyecto
                </Link>
                {auth.isTeacher ? (
                  <Link
                    to={"/deliveryTeacher/project/" + item.id + "/" + userID}
                  >
                    Ver Entrega
                  </Link>
                ) : (
                  <Link to={"/delivery/project/" + item.id}>Ver Entrega</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={
            toggleState === 2
              ? `${style.content}  ${style.active_content}`
              : style.content
          }
        >
          <h2 className={style.proyectrow}>Workbooks</h2>
          <hr />
          {workbookInfo.map((item) => (
            <div className={style.name}>
              <h4>{item.name}</h4>
              <div className={style.links}>
                <Link to={"/workbook/view-workbook/" + item.id}>
                  Ver Workbook
                </Link>
                {auth.isTeacher ? (
                  <Link to={"/delivery/workbook/" + item.id + "/" + userID}>
                    Ver Entrega
                  </Link>
                ) : (
                  <Link to={"/delivery/project/" + item.id}>Ver Entrega</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={
            toggleState === 3
              ? `${style.content}  ${style.active_content}`
              : style.content
          }
        >
          <h2 className={style.proyectrow}>Consultas Entregados</h2>
          <hr />
          {queryInfo.map((item) => (
            <div className={style.name}>
              <h4>{item.name}</h4>
              <div className={style.links}>
                <Link to={"/query/view-query/" + item.id}>Ver Consulta</Link>
                {auth.isTeacher ? (
                  <Link to={"/delivery/query/" + item.id + "/" + userID}>
                    Ver Entrega
                  </Link>
                ) : (
                  <Link to={"/delivery/project/" + item.id}>Ver Entrega</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { TableStudent };
