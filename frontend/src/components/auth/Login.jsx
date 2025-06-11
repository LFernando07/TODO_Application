import { useState } from 'react';
import { useAuth } from '../../hooks/context/authContext';
import Swal from 'sweetalert2';

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch {
      // Cambiar por un mensaje de Error de credenciales
      Swal.fire({
        title: "Fallo al iniciar sesion",
        text: "Por favor, verifica tus credenciales e intenta nuevamente.",
        icon: "question"
      });

      //Limpiamos los campos
      setFormData({
        email: "", password: ""
      })
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label htmlFor="chk" aria-hidden="true" className='label-txt'>Iniciar Sesion</label>
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} className='entrada' required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className='entrada' required />
        <button type='submit' className='btn-action'>Ingresar</button>
      </form>
    </div>
  )
}
