import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card } from "react-bootstrap";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "./addProject.css";
import ResourceForm from "./resources/ResourceForm";
import ResourceRow from "./resources/ResourceRow";
import CompetenceForm from "./competence/CompetenceForm";
import TitleSection from "../../../../componentes/titles/TitleSection";
import * as controllerProject from "../../../../controllers/controllerProject";

const AddProject = () => {
  const [formsent, setFormsent] = useState(false);
  const [tags, setTags] = useState([]);
  const [resources, setResources] = useState([]);
  const [competencies, setCompetencies] = useState([]);

  const addLink = (link) => {
    const newResources = [...resources, { link }];
    setResources(newResources);
  };

  const removeResource = (index) => {
    const newResources = [...resources];
    newResources.splice(index, 1);
    setResources(newResources);
  };

  const getCompetencies = (data) => {
    setCompetencies(data);
  };

  return (
    <>
      <TitleSection name={"Agregar proyecto"} />
      <Formik
        initialValues={{
          picture: "",
          name: "",
          description: "",
          tags: [],
          competenceFramework: "Desarrollador web y movil",
          resources: [],
          context: "",
          evaluationModality: "",
          date: "",
          pedagogyModality: "",
          performance: "",
          deliverables: "",
          competencies: [],
        }}
        onSubmit={(values, { resetForm }) => {
          values.tags = tags;
          values.resources = resources;
          values.competencies = competencies;
          resetForm();
          setFormsent(true);
          setResources([]);
          setTags([]);
          setCompetencies([]);
          setTimeout(() => setFormsent(false), 3000);
          console.log(values);
          controllerProject.registerProject(values);
        }}
        validate={(values) => {
          let errors = {};

          // Validación picture
          if (!values.picture) errors.picture = "Este campo es requerido";

          // Validación nombre
          if (!values.name) errors.name = "Este campo es requerido";

          // Validación descripcion
          if (!values.description)
            errors.description = "Este campo es requerido";

          // Validación context
          if (!values.context) errors.context = "Este campo es requerido";

          // Validación evaluationModality
          if (!values.evaluationModality)
            errors.evaluationModality = "Este campo es requerido";

          // Validación pedagogyModality
          if (!values.pedagogyModality)
            errors.pedagogyModality = "Este campo es requerido";

          // Validación performance
          if (!values.performance)
            errors.performance = "Este campo es requerido";

          // Validación date
          if (!values.date) errors.date = "Este campo es requerido";

          // Validación deliverables
          if (!values.deliverables)
            errors.deliverables = "Este campo es requerido";

          return errors;
        }}
      >
        {({ errors }) => (
          <Form className="AddProjectForm">
            <div>
      
              <label htmlFor="name">Agregar imagen</label>

              <Field
                type="file"
                name="picture"
                id="picture"
                accept="image/png, image/jpg, image/jpeg"
              />
              <ErrorMessage
                name="picture"
                component={() => <div className="error">{errors.picture}</div>}
              />
            </div>

            <div>
              <label htmlFor="name">Nombre del proyecto</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage
                name="name"
                component={() => <div className="error">{errors.name}</div>}
              />
            </div>

            <div>
              <label htmlFor="description">Descripción</label>
              <Field as="textarea" name="description" id="description" />
              <ErrorMessage
                name="description"
                component={() => (
                  <div className="error">{errors.description}</div>
                )}
              />
            </div>

            <label htmlFor="resources">Etiquetas</label>
            <div>
              <ReactTagInput
                placeholder="Ingresa las etiquetas"
                tags={tags}
                onChange={(newTags) => setTags(newTags)}
              />
            </div>

            <div>
              <label htmlFor="competenceFramework">Marco de competencias</label>
              <Field
                type="text"
                name="competenceFramework"
                id="competenceFramework"
              />

              <ErrorMessage
                name="competenceFramework"
                component={() => (
                  <div className="error">{errors.competencies}</div>
                )}
              />
            </div>

            <label htmlFor="resources">Recursos</label>
            <div className="app">
              <div className="container">
                <ResourceForm addLink={addLink} />
                <div>
                  {resources.map((resource, index) => (
                    <Card key={index}>
                      <Card.Body>
                        <ResourceRow
                          key={index}
                          index={index}
                          resource={resource}
                          removeResource={removeResource}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description">Contexto del proyecto</label>
              <Field as="textarea" name="context" id="context" />
              <ErrorMessage
                name="context"
                component={() => <div className="error">{errors.context}</div>}
              />
            </div>

            <div>
              <label htmlFor="evaluationModality">
                Modalidades de evaluación{" "}
              </label>
              <Field
                as="textarea"
                name="evaluationModality"
                id="evaluationModality"
              />
              <ErrorMessage
                name="evaluationModality"
                component={() => (
                  <div className="error">{errors.evaluationModality}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="pedagogyModality">Modalidades pedagógicas</label>
              <Field
                as="textarea"
                name="pedagogyModality"
                id="pedagogyModality"
              />
              <ErrorMessage
                name="pedagogyModality"
                component={() => (
                  <div className="error">{errors.pedagogyModality}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="performance">Criterios de rendimiento</label>
              <Field as="textarea" name="performance" id="performance" />
              <ErrorMessage
                name="performance"
                component={() => (
                  <div className="error">{errors.performance}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="deliverables">Fecha y hora limite</label>
              <Field type="datetime-local" name="date" id="date" />
              <ErrorMessage
                name="date"
                component={() => <div className="error">{errors.date}</div>}
              />
            </div>

            <div>
              <label htmlFor="deliverables">Entregables</label>
              <Field as="textarea" name="deliverables" id="deliverables" />
              <ErrorMessage
                name="deliverables"
                component={() => (
                  <div className="error">{errors.deliverables}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="competencies">Competencias</label>
              <div>
                <CompetenceForm getCompetencies={getCompetencies} />
              </div>
            </div>

            <button
              variant="warning mb-3 font-weight-bold text-2 btn-sm"
              type="submit"
            >
              Enviar
            </button>
            {formsent && <p className="exito">Proyecto agregado con exito</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProject;
