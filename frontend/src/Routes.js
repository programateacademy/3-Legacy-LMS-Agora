import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./utils/ScrollToTop";

import Login from "./views/auth/login/Login";
import { Header } from "./components/header/Header";
import { Error404 } from "./components/404/Error404";
import ForgotPassword from "./views/auth/forgotPassword/ForgotPassword";

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
import { Workbooks } from "./views/activities/workbook/Workbooks";

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

import { ProfileStudent } from "./components/ProfileStudent/ProfileStudent";

import { CreateBootcamp } from "./views/bootcamps/createBootcamp/CreateBootcamp";
import { UpdateBootcamp } from "./views/bootcamps/updateBootcamp/UpdateBootcamp";

import { CreateProject } from "./views/activities/projects/createProject/CreateProject";
import { CreateQuery } from "./views/activities/query/createQuery/CreateQuery";
import { CreateWorkbook } from "./views/activities/workbook/createWorkbook/CreateWorkbook.jsx";
import { UpdateQuery } from "./views/activities/query/updateQuery/UpdateQuery";
import { UpdateWorkbook } from "./views/activities/workbook/updateWorkbook/UpdateWorkbook";
import { UpdateProject } from "./views/activities/projects/updateProject/UpdateProject";
import { ViewProject } from "./views/activities/projects/viewProject/ViewProject";
import { ViewWorkbook } from "./views/activities/workbook/viewWorkbook/ViewWokbook";
import { ViewQuery } from "./views/activities/query/viewQury/viewQuery";
import { RegisterSuperAdmin } from "./views/auth/register/RegisterSuperAdmin";
import { AllCohorts } from "./views/cohort/allCohorts/AllCohorts";
import { TableAllStudents } from "./views/tableStudentCohort/TableAllStudents";
import { ModalDeliveryStudent } from "./components/ModalEntrega/ModalDeliveryStudent";
import { ModalEntrega } from "./components/ModalEntrega/ModalEntrega";

export function RoutesApp() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isSuperAdmin, isTeacher, isStudent } = auth;

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<Header />}>
          {/*  Without being logged in */}
          <Route
            path="/api/activation/:activation_token"
            element={<ActivationEmail />}
            exact
          />
          <Route
            path="/register/activation-superAdmin/:id"
            element={<RegisterSuperAdmin />}
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
            path="/all-cohorts/"
            element={isAdmin ? <AllCohorts /> : <Error404 />}
            exact
          />
          <Route
            path="/all-students/"
            element={isAdmin ? <TableAllStudents /> : <Error404 />}
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
            path="/dashboard/:id"
            element={
              isTeacher ? (
                <Dashboard />
              ) : isStudent ? (
                <Dashboard />
              ) : (
                <Error404 />
              )
            }
            exact
          >
            <Route
              path="/dashboard/:id/queries"
              element={
                isTeacher ? (
                  <Queries teacher={true} />
                ) : isStudent ? (
                  <Queries teacher={false} />
                ) : (
                  <Error404 />
                )
              }
              exact
            />
            <Route
              path="/dashboard/:id/projects"
              element={
                isTeacher ? (
                  <Projects teacher={true} />
                ) : isStudent ? (
                  <Projects teacher={false} />
                ) : (
                  <Error404 />
                )
              }
              exact
            />
            <Route
              path="/dashboard/:id/workbooks"
              element={
                isTeacher ? (
                  <Workbooks teacher={true} />
                ) : isStudent ? (
                  <Workbooks teacher={false} />
                ) : (
                  <Error404 />
                )
              }
              exact
            />
            <Route
              path="/dashboard/:id/announcements-cohort"
              element={
                isTeacher ? (
                  <Announcements teacher={true} />
                ) : isStudent ? (
                  <Announcements teacher={false} />
                ) : (
                  <Error404 />
                )
              }
            />
          </Route>

          <Route
            path="/project/create-project/:id"
            element={isTeacher ? <CreateProject /> : <Error404 />}
            exact
          />

          <Route
            path="/project/update-project/:id"
            element={isTeacher ? <UpdateProject /> : <Error404 />}
            exact
          />
          <Route
            path="/query/create-query/:id"
            element={isTeacher ? <CreateQuery /> : <Error404 />}
            exact
          />
          <Route
            path="/project/view-project/:id"
            element={
              isTeacher ? (
                <ViewProject teacher={true} />
              ) : isStudent ? (
                <ViewProject teacher={false} />
              ) : (
                <Error404 />
              )
            }
            exact
          />
          <Route
            path="/query/view-query/:id"
            element={
              isTeacher ? (
                <ViewQuery teacher={true} />
              ) : isStudent ? (
                <ViewQuery teacher={false} />
              ) : (
                <Error404 />
              )
            }
            exact
          />
          <Route
            path="/workbook/view-workbook/:id"
            element={
              isTeacher ? (
                <ViewWorkbook teacher={true} />
              ) : isStudent ? (
                <ViewWorkbook teacher={false} />
              ) : (
                <Error404 />
              )
            }
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
            path="/workbook/update-workbook/:id"
            element={isTeacher ? <UpdateWorkbook /> : <Error404 />}
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

          <Route
            path="/delivery/:kind/:id"
            element={isStudent ? <ModalDeliveryStudent /> : <Error404 />}
          />
          <Route
            path="/profile/"
            element={isStudent ? < ProfileStudent /> : <Error404 />}
          />
          </Route>
        </Routes>

        <Footer />
      </ScrollToTop>
    </Router>
  );
}
