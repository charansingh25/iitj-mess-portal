import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import App from './App.jsx';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './store';
import Registration from './components/Registration.jsx';
import LoginForm from './components/LoginForm.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import StudentDashboard from './components/student/studentDashboard.jsx';
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
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home />, children: [
          {path: '', element: <LoginForm />},
          {path: '/register', element: <Registration />},
          {path: '/admin-login', element: <AdminLogin />},

        ]
      },
      // { path: 'sign-up', element: <SignUp /> },
      // { path: 'sign-in', element: <SignInStudent /> },
      // { path: 'sign-in-admin', element: <SignInAdmin /> },
      
      // Student Routes
      { path: 'student', element: <StudentDashboard />, children: [
          // { path: '', element: <StudentGuidelines /> },
          // { path: 'select-mess', element: <StudentCorner /> },
          // { path: 'previous-data', element: <StudentPreviousData /> },
          // { path: 'selected-mess-data', element: <SelectedMessdata /> },
          // { path: 'generate-new-qr', element: <GenerateNewQR /> },
        ]
      },

      // // Admin Routes
      // { path: 'admin', element: <AdminCorner />, children: [
      //     { path: '', element: <AdminGuidelines /> },
      //     { path: 'register', element: <RegisterUser /> },
      //     { path: 'manage-students/*', element: <ManageStudents /> },
      //   ]
      // },

      // // Mess Routes
      // { path: 'mess', element: <MessCorner />, children: [
      //     { path: '', element: <MessGuidelines /> },
      //     { path: 'mess-entry', element: <VerifyUser /> },
      //     { path: 'mess-overall', element: <MessOverAllStudents /> },
      //   ]
      // },

      // // Redirect unknown routes to Home
      // { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
