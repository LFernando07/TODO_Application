import { useState } from 'react';
import { useAuth } from '../../hooks/context/authContext';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/profile");   // redirige desde aquí
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label htmlFor="chk" aria-hidden="true">Iniciar Sesion</label>
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type='submit'>Ingresar</button>
      </form>
    </div>
  )
}
