import React, { useState } from "react";
import { useAuth } from "../../hooks/context/authContext";
import { Link } from "react-router";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import '../../styles/Profile.css';
import Swal from "sweetalert2";

export const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email
    });
    setEditing(false);
  };

  const handleSave = async () => {

    updateUser(user.id, formData)

    setEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>Perfil del Usuario</h1>
      {user ? (
        <div className={`card ${editing ? 'editing' : ''}`}>
          <div className="image">
            <BorderColorIcon className="edit-icon" onClick={handleEdit} titleAccess="Editar perfil" />
          </div>

          {!editing ? (
            <div className="card-info">
              <div className="header-edit">
                <span>{user.name}</span>
              </div>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          ) : (
            <div className="card-info">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nombre de usuario"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
              <div className="edit-buttons">
                <button className="button save" onClick={handleSave}>Guardar</button>
                <button className="button cancel" onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          )}

          <div className="actions">
            <Link to={'/dashboard'} className="button">Ir a Dashboard</Link>
            <a href="#" className="button" onClick={logout}>Cerrar Sesión</a>
          </div>
        </div>
      ) : (
        <p>No hay usuario autenticado</p>
      )}
    </div>
  );
};
