import { useEffect, useState } from "react";
import style from "../ProfileStudent/TableStudent.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useProjects from "../../hooks/useProjects";
import useWorkbooks from "../../hooks/useWorkbooks";
import useQueries from "../../hooks/useQueries"; 

function TableStudent(props) {
  const { projects, workbooks, queries, userID } = props;
  const auth = useSelector((state) => state.auth);
  const projectInfoData = useSelector((state) => state.projects.data);
  const workbookInfoData = useSelector((state) => state.workbooks.data);
  const queryInfoData = useSelector((state) => state.queries.data);
  const [toggleState, setToggleState] = useState(1);

  const { getProject } = useProjects();
  const { getWorkbook } = useWorkbooks();
  const { getQuery } = useQueries();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    projects.forEach((id) => getProject(id, userID));
  }, [projects, getProject, userID]);

  useEffect(() => {
    workbooks.forEach((id) => getWorkbook(id, userID));
  }, [workbooks, getWorkbook, userID]);

  useEffect(() => {
    queries.forEach((id) => getQuery(id, userID));
  }, [queries, getQuery, userID]);

  const projectInfo = Object.keys(projectInfoData).map(
    (projectId) => projectInfoData[projectId]
  );

  const workbookInfo = Object.keys(workbookInfoData).map(
    (workbookId) => workbookInfoData[workbookId]
  );

  const queryInfo = Object.keys(queryInfoData).map(
    (queryId) => queryInfoData[queryId]
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
            <div className={style.name} key={item.id}>
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
          <h2 className={style.proyectrow}>Workbooks Entregados</h2>
          <hr />
          {workbookInfo.map((item) => (
            <div className={style.name} key={item.id}>
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
            <div className={style.name} key={item.id}>
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
