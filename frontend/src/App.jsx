import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { useAuth } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ScenarioView from './components/scenarios/ScenarioView';
import Home from './components/pages/Home';
import Navbar from './components/ui/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="container mx-auto px-4 py-6">
      {children}
    </main>
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AuthProvider><MainLayout><Home /></MainLayout></AuthProvider>
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
      path: "/dashboard",
      element: <AuthProvider><PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute></AuthProvider>
    },
    {
      path: "/scenario/:scenarioId",
      element: <AuthProvider><PrivateRoute><MainLayout><ScenarioView /></MainLayout></PrivateRoute></AuthProvider>
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
