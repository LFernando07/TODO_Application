import React from "react";
import { useAuth } from "../../hooks/context/authContext";
import { Link } from "react-router";

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Perfil del Usuario</h1>
      {user ? (
        <div>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Correo electrónico:</strong> {user.email}</p>
          <Link to="/dashboard">
            <button>Ir al Dashboard</button>
          </Link>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No hay usuario autenticado</p>
      )}
    </div>
  );
};
