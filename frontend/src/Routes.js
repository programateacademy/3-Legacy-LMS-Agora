import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./utils/ScrollToTop";

import Login from "./views/auth/login/Login";
import { Header } from "./components/header/Header";
import { Error404 } from "./components/404/Error404";
import ForgotPassword from "./views/auth/forgotPassword/ForgotPassword";
/* import { MenuDashboard } from "./components/menu/MenuDashboard"; */

import { SuperAdminHome } from "./views/home/superAdmin/SuperAdminHome";
import { AdminHome } from "./views/home/admin/AdminHome";
import { CohortsTeacher } from "./views/cohort/cohortsTeacher/CohortsTeacher";
import { Dashboard } from "./views/dashboard/Dashboard";

import { UpdateRegister } from "./views/auth/register/UpdateRegister";
import { RegisterStudent } from "./views/auth/register/RegisterStudent";
import { RegisterAdmin } from "./views/auth/register/RegisterAdmin";
import { UpdateRegisterAdmin } from "./views/auth/register/UpdateRegisterAdmin";
import { RegisterTeacher } from "./views/auth/register/RegisterTeacher";
import { Announcements } from "./views/announcements/Announcements";

import { Projects } from "./views/activities/projects/Projects";
import { Queries } from "./views/activities/query/Queries";
import {Workbooks} from "./views/activities/workbook/Workbooks";

import { ResetPassword } from "./views/auth/resetPassword/ResetPassword";

import ActivationEmail from "./views/auth/activationEmail/ActivationEmail";
import { Footer } from "./components/footer/Footer";
import { TableTeacher } from "./views/tableTeachers/TableTeacher";
import { TableStudentCohort } from "./views/tableStudentCohort/TableStudentCohort";
import { Competences } from "./views/competences/Competences";

import { CohortsAdmin } from "./views/cohort/cohortsAdmin/CohortsAdmin";
import { CreateCohort } from "./views/cohort/createCohort/CreateCohort";
import { CompetencesUpdate } from "./views/competences/CompetencesUpdate";
import { UpdateCohort } from "./views/cohort/updateCohort/UpdateCohort";
import { DashboardCohort } from "./views/dashboard/dashboardCohort/DashboardCohort";

import { CreateBootcamp } from "./views/bootcamps/createBootcamp/CreateBootcamp";
import { UpdateBootcamp } from "./views/bootcamps/updateBootcamp/UpdateBootcamp";
import { CreateProject } from "./views/activities/projects/createProject/CreateProject";
import { CreateQuery } from "./views/activities/query/createQuery/CreateQuery";
import { CreateWorkbook } from "./views/activities/workbook/createWorkbook/CreateWorkbook.jsx";
import { UpdateQuery } from "./views/activities/query/updateQuery/UpdateQuery";

/* import { ProfileStudent } from "./components/ProfileStudent/ProfileStudent"; */
import { UpdateProject } from "./views/activities/projects/updateProject/UpdateProject";
import { ViewProject } from "./views/activities/projects/viewProject/ViewProject";


export function RoutesApp() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isSuperAdmin, isTeacher, isStudent } = auth;

  return (
      <Router>
         <ScrollToTop>
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
                  <SuperAdminHome />
                ) : isAdmin ? (
                  <AdminHome />
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
            element={isLogged ? <ResetPassword /> : <Error404 />}
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
          <Route
            path="/bootcamp/dashboard-cohort/:id"
            element={isAdmin ? <DashboardCohort /> : <Error404 />}
            exact
          />
          
          {/* //isTeacher */}
          
          <Route
            path="/project/create-project/:id"
            element={isTeacher ? <CreateProject /> : <Error404 />}
            exact
          />
            <Route
              path="/queries/:id"
              element={isTeacher ? <Queries teacher={true} /> : isStudent ? <Queries teacher={false} /> : <Error404 />}
              exact
            />
          <Route
            path="/projects/:id"
            element={isTeacher ? <Projects teacher={true} /> : isStudent ? <Projects teacher={false} /> :  <Error404 />}
            exact
          />
          <Route
            path="/workbooks/:id"
            element={isTeacher ? <Workbooks teacher={true} /> : isStudent ? <Workbooks teacher={false} /> :  <Error404 />}
            exact
          />
          <Route
            path="/project/update-project/:id"
            element={isTeacher ? <UpdateProject /> : <Error404 />}
            exact
          />
          <Route
            path="/project/view-project/:id"
            element={isTeacher ? <ViewProject /> : <Error404 />}
            exact
          />
          <Route
            path="/query/create-query/:id"
            element={isTeacher ? <CreateQuery /> : <Error404 />}
            exact
          />
          <Route
            path="/query/update-query/:id"
            element={isTeacher ? <UpdateQuery /> : <Error404 />}
            exact
          />
          <Route
            path="/workbook/create-workbook/:id"
            element={isTeacher ? <CreateWorkbook /> : <Error404 />}
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
          <Route
            path="/announcements-cohort/:id"
            element={isTeacher ? <Announcements /> : <Error404 />}
          />
        </Routes>
        <Footer />
        </ScrollToTop>
      </Router>
  );
}
