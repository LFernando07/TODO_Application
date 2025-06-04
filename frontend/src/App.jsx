import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthPage } from "./pages/auth/AuthPage";
import { useAuth, AuthProvider } from "./hooks/context/authContext";
import { ProfilePage } from "./pages/user/ProfilePage";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  // Logica para rutas privadas y publicas
  const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
  }

  return (
    //Envolvemos el contexto de usuario en toda la aplicación

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pagina publica para autenticarse */}
          <Route path="/" element={<AuthPage />} />

          {/* Rutas privadas que requieren autenticación */}
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
          />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}