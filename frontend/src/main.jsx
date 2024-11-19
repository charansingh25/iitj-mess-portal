import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./components/GlobalContext.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
// import App from './App.jsx';
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";
import Registration from "./components/Registration.jsx";
import LoginForm from "./components/LoginForm.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import StudentDashboard from "./components/student/studentDashboard.jsx";
import MessDashboard from "./components/mess/messDashboard.jsx";
import AdminDashboard from "./components/admin/adminDashboard.jsx";
import SelectMess from "./components/student/functions/selectMess.jsx";
import StudentPreviousData from "./components/student/functions/previousData.jsx";
import SelectedMessdata from "./components/student/functions/selectedMess.jsx";
import GenerateNewQR from "./components/student/functions/generateNewQR.jsx";
import StudentGuidelines from "./components/student/functions/studentGuidelines.jsx";
import MessGuidelines from "./components/mess/functions/messGuidelines.jsx";
import MessEntry from "./components/mess/functions/messEntry.jsx";
import MessOverAll from "./components/mess/functions/messOverAll.jsx";
import AdminGuidelines from "./components/admin/functions/adminGuidelines.jsx";
import AdminRegister from "./components/admin/functions/adminRegister.jsx";
import ManageStudents from "./components/admin/manageStudents.jsx";

// import SignUp from './components/student/signup';
// import SignInStudent from './components/student/signin';
// import SignInAdmin from './components/mess/signin';
// import StudentDashboard from './components/student/studentDashboard';
// import StudentGuidelines from './components/student/studentGuidelines';
// import StudentCorner from './components/student/studentCorner';
// import StudentPreviousData from './components/student/previousData';
// import SelectedMessdata from './components/student/selectedMess';
// import GenerateNewQR from './components/student/generateNewQR';
// import AdminCorner from './components/admin/adminCorner';
// import RegisterUser from './components/admin/registerUser';
// import ManageStudents from './components/admin/manageStudents';
// import AdminGuidelines from './components/admin/adminGuidelines';
// import MessCorner from './components/mess/messCorner';
// import MessGuidelines from './components/mess/messGuidelines';
// import VerifyUser from './components/mess/verifyfinger';
// import MessOverAllStudents from './components/mess/messOverAllStudents';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          { path: "", element: <LoginForm /> },
          { path: "/register", element: <Registration /> },
          { path: "/admin-login", element: <AdminLogin /> },
        ],
      },

      // Student Routes
      {
        path: "student",
        element: <StudentDashboard />,
        children: [
          { path: "", element: <StudentGuidelines /> },
          { path: "select-mess", element: <SelectMess /> },
          { path: "previous-data", element: <StudentPreviousData /> },
          { path: "selected-mess", element: <SelectedMessdata /> },
          { path: "generate-new-qr", element: <GenerateNewQR /> },
        ],
      },

      // // Admin Routes
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          { path: "", element: <AdminGuidelines /> },
          { path: "register", element: <AdminRegister /> },
          { path: "manage-students/*", element: <ManageStudents /> },
        ],
      },

      // // Mess Routes
      {
        path: "mess",
        element: <MessDashboard />,
        children: [
          { path: "", element: <MessGuidelines /> },
          { path: "mess-entry", element: <MessEntry /> },
          { path: "mess-overall", element: <MessOverAll /> },
        ],
      },

      // // Redirect unknown routes to Home
      // { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GlobalProvider>
  </StrictMode>
);
