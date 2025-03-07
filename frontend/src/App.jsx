import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { useAuth } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ScenarioView from './components/scenarios/ScenarioView';
import Home from './components/pages/Home';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/home" />
    },
    {
      path: "/login",
      element: <AuthProvider><Login /></AuthProvider>
    },
    {
      path: "/register",
      element: <AuthProvider><Register /></AuthProvider>
    },
    {
      path: "/home",
      element: <AuthProvider><PrivateRoute><Home /></PrivateRoute></AuthProvider>
    },
    {
      path: "/dashboard",
      element: <AuthProvider><PrivateRoute><Dashboard /></PrivateRoute></AuthProvider>
    },
    {
      path: "/scenario/:scenarioId",
      element: <AuthProvider><PrivateRoute><ScenarioView /></PrivateRoute></AuthProvider>
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
