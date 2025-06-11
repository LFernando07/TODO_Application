import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthPage } from "./pages/auth/AuthPage";
import { useAuth, AuthProvider } from "./hooks/context/authContext";
import { TaskProvider } from "./hooks/context/taskContext";
import { ProfilePage } from "./pages/user/ProfilePage";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";


export default function App() {
  // Logica para rutas privadas y publicas
  const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      {/* //Envolvemos el contexto de usuario en toda la aplicación */}
      <AuthProvider>
        <Routes>
          {/* Pagina publica sin autenticarse */}
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />

          {/* Rutas privadas que requieren autenticación */}
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
          />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <TaskProvider>
                <Dashboard />
              </TaskProvider>
            </PrivateRoute>
          }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}