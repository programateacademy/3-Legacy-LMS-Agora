import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./views/auth/login/Login";
import { Header } from "./components/header/Header";
import { Error404 } from "./components/404/Error404";
import ForgotPassword from "./views/auth/forgotPassword/ForgotPassword";
/* import { MenuDashboard } from "./components/menu/MenuDashboard"; */

import { SuperAdminDashboard } from "./views/dashboard/superAdmin/SuperAdminDashboard";
import { AdminDashboard } from "./views/dashboard/admin/AdminDashboard";
import { CohortsTeacher } from "./views/cohortsTeacher/CohortsTeacher";
import { Dashboard } from "./views/dashboard/Dashboard";

import { UpdateRegister } from "./views/auth/register/UpdateRegister";
import { RegisterStudent } from "./views/auth/register/RegisterStudent";
import { RegisterAdmin } from "./views/auth/register/RegisterAdmin";
import { UpdateRegisterAdmin } from "./views/auth/register/UpdateRegisterAdmin";
import { RegisterTeacher } from "./views/auth/register/RegisterTeacher";
import { Announcements } from "./views/announcements/Announcements";
import CreateAnnouncement from "./views/announcements/CreateAnnouncement";

import { CardProject } from "../src/components/cards/activity/CardProject";
import AddProject from "./views/activities/trainer/addProject/AddProject";
import DeliveryProjectStudent from "./views/activities/student/deliveryProject/DeliveryProjectStudent";
import DeliveryProjectTrainer from "./views/activities/trainer/deliveryProject/DeliveryProjectTrainer";
import Deliverie from "./components/deliverie/Deliverie";
import ShowProject from "./views/activities/ShowActivities/showProject/ShowProject";
/* import { ShowProjects } from "./views/activities/ShowActivities/showProjects/showProjects"; */

import ResetPassword from "./views/auth/resetPassword/ResetPassword";
import { Configuration } from "./views/configuration/Configuration";

import ActivationEmail from "./views/auth/activationEmail/ActivationEmail";
import { Footer } from "./components/footer/Footer";
import { TableTeacher } from "./views/tableTeachers/TableTeacher";
import { TableStudentCohort } from "./views/tableStudentCohort/TableStudentCohort";
import { Competences } from "./views/competences/Competences";

import { CohortsAdmin } from "./views/cohortsAdmin/CohortsAdmin";
import { CreateCohort } from "./views/cohort/createCohort/CreateCohort";
import { CompetencesUpdate } from "./views/competences/CompetencesUpdate";
import { UpdateCohort } from "./views/cohort/updateCohort/UpdateCohort";

import { CreateBootcamp } from './views/bootcamps/createBootcamp/CreateBootcamp';
import { UpdateBootcamp } from "./views/bootcamps/updateBootcamp/UpdateBootcapm";

export function RoutesApp() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isSuperAdmin, isTeacher, isStudent } = auth;

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/*  Without being logged in */}
          <Route
            path="/api/activation/:activation_token"
            element={<ActivationEmail />}
            exact
          />
          <Route path="/forgot_password" element={<ForgotPassword />} exact />
          <Route
            path="/"
            element={
              isLogged ? (
                isSuperAdmin ? (
                  <SuperAdminDashboard />
                ) : isAdmin ? (
                  <AdminDashboard />
                ) : isTeacher ? (
                  <CohortsTeacher />
                ) : isStudent ? (
                  <Dashboard />
                ) : (
                  <Error404 />
                )
              ) : (
                <Login />
              )
            }
            exact
          />
          <Route
            path="/login"
            element={isLogged ? <Error404 /> : <Login />}
            exact
          />
          <Route path="*" element={<Error404 />} />
          {/*  Universal login */}

          <Route
            path="/configuration"
            element={isLogged ? <Configuration /> : <Error404 />}
            exact
          />
          <Route
            path="/user/reset/:token"
            element={isLogged ? <Error404 /> : <ResetPassword />}
            exact
          />
          {/* isSuperAdmin */}
          <Route
            path="/register_admin"
            element={isSuperAdmin ? <RegisterAdmin /> : <Error404 />}
            exact
          />
          <Route
            path="/update_admin/:id"
            element={isSuperAdmin ? <UpdateRegisterAdmin /> : <Error404 />}
            exact
          />
          {/* isAdmin */}
          <Route
            path="/register_teacher"
            element={isAdmin ? <RegisterTeacher /> : <Error404 />}
            exact
          />
          <Route
            path="/list_teachers"
            element={isAdmin ? <TableTeacher /> : <Error404 />}
            exact
          />
          <Route
            path="/cohort/register_student/:id"
            element={isAdmin ? <RegisterStudent /> : <Error404 />}
            exact
          />
          <Route
            path="/update_user/:id"
            element={isAdmin ? <UpdateRegister /> : <Error404 />}
            exact
          />
          <Route
            path="/bootcamp/cohorts/:id"
            element={isAdmin ? <CohortsAdmin /> : <Error404 />}
            exact
          />
          <Route
            path="/bootcamp/cohorts/create-cohort/:id"
            element={isAdmin ? <CreateCohort /> : <Error404 />}
            exact
          />
          <Route
            path="/bootcamp/cohort/students/:id"
            element={isAdmin ? <TableStudentCohort /> : <Error404 />}
            exact
          />
          <Route
            path="/cohort/update/:id"
            element={isAdmin ? <UpdateCohort /> : <Error404 />}
            exact
          />
          <Route
            path="/bootcamp/create-bootcamp"
            element={isAdmin ? <CreateBootcamp /> : <Error404 />}
            exact
          />
          <Route
            path="/bootcamp/update-bootcamp/:id"
            element={isAdmin ? <UpdateBootcamp /> : <Error404 />}
            exact
          />
          
          //isTeacher
          

          {/* //isTeacher //isStudent //isAdmin */}
          <Route path="/crearProyecto" element={<AddProject />} />
          <Route path="/proyectos" element={<CardProject />} />
          <Route path="/proyectos/:id" element={<ShowProject />} />
          <Route path="/crearAnuncio" element={<CreateAnnouncement />} />
          <Route path="/anuncios" element={<Announcements />} />
          {/*      //isTeacher //isStudent */}
          <Route
            path="/entregasFormador"
            element={<DeliveryProjectTrainer />}
          />
          <Route
            path="/entregasEstudiante"
            element={<DeliveryProjectStudent />}
          />
          <Route
            path="/user/deliverie/:id_deliverie"
            element={isLogged ? <Deliverie /> : <Error404 />}
            exact
          />
          <Route
            path="/competences/:id"
            element={isAdmin ? <Competences /> : <Error404 />}
          />
          <Route
            path="/competences-update/:id"
            element={isAdmin ? <CompetencesUpdate /> : <Error404 />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
