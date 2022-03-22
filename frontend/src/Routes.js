import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./views/auth/login/Login";
import { Header } from "./components/header/Header";
import { Error404 } from "./components/404/Error404";
import ForgotPassword from "./views/auth/forgotPassword/ForgotPassword";
import { MenuDashboard } from "./components/menu/MenuDashboard";

import { SuperAdminDashboard } from "./views/dashboard/superAdmin/superAdminDashboard";
import { AdminDashboard } from "./views/dashboard/admin/adminDashboard";
import { Cohort } from "./views/cohort/Cohort";
import Dashboard from "./views/dashboard/student/Dashboard";

import Register from "./views/auth/register/Register";
import { Announcements } from "./views/announcements/Announcements";
import CreateAnnouncement from "./views/announcements/CreateAnnouncement";

import AddProject from "./views/Activities/trainer/addProject/AddProject";
import DeliveryProjectStudent from "./views/Activities/student/deliveryProject/DeliveryProjectStudent";
import DeliveryProjectTrainer from "./views/Activities/trainer/deliveryProject/DeliveryProjectTrainer";
import Deliverie from "./components/deliverie/Deliverie";
import ShowProject from "./views/Activities/ShowActivities/showProject/ShowProject";
import { ShowProjects } from "./views/Activities/ShowActivities/showProjects/showProjects";

import ResetPassword from "./views/auth/resetPassword/ResetPassword";
import { Configuration } from "./views/configuration/Configuration";
import { EditUser } from "./views/configuration/EditUser";

import ActivationEmail from "./views/auth/activationEmail/ActivationEmail";
import { Footer } from "./components/footer/Footer";

export function RoutesApp() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isSuperAdmin, isTeacher, isStudent } = auth;



  return (
    <>
      <Router>
        <Header />
        <Routes>
          //Sin Estar logeado
          <Route
            path="/api/activation/:activation_token"
            element={<ActivationEmail />}
            exact
          />
          <Route path="/forgot_password" element={<ForgotPassword />} exact />
          <Route
            path="/"
            element={isLogged ?
              isSuperAdmin ? <SuperAdminDashboard /> :
                isAdmin ? <AdminDashboard /> :
                  isTeacher ? <Cohort /> :
                    isStudent ? <Dashboard /> : <Error404 /> : <Login />}
            exact
          />

          <Route
            path="/login"
            element={isLogged ? <Error404 /> : <Login />}
            exact
          />

          <Route path="*" element={<Error404 />} />

          //Logeado universal
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

          //isSuperAdmin
          <Route path="/create_user" element={<Register />} exact />

          //isAdmin
          <Route
            path="/edit_user/:id"
            element={isAdmin ? <EditUser /> : <Error404 />}
            exact
          />
          <Route path="/create_user" element={<Register />} exact />
          <Route path='/' element={isStudent || isTeacher ? <MenuDashboard /> : null}>
          //isTeacher

            //isStudent


            <Route path="/crearProyecto" element={<AddProject />} />
            <Route path="/proyectos" element={<ShowProjects />} />
            <Route path="/proyectos/:id" element={<ShowProject />} />
            <Route path="/crearAnuncio" element={<CreateAnnouncement />} />
            <Route path="/anuncios" element={<Announcements />} />


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
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
