import { useState } from "react";
import { useAuth } from '../../hooks/context/authContext';
import { apiService } from '../../service/api';


export const Register = () => {
  // Manejo de un estado para campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const { login } = useAuth();

  // Funcion para el llenado del estado del formulario
  const handleChange = (e) => {
    // Llenamos los campos del formulario con los valores ingresados
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funcion para manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Creamos al usuario con los datos del formulario
    try {
      await apiService.createUser(formData)

      // loguear al usuario inmediatamente después de crear la cuenta
      await login({
        email: formData.email,
        password: formData.password
      });

    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Aquí podrías manejar errores, como mostrar un mensaje al usuario
    }

  }

  return (
    <div className="signup">
      <form onSubmit={handleRegister}>
        <label htmlFor="chk" aria-hidden="true">Registro</label>
        <input type="text" name="name" placeholder="Nombre Completo" required onChange={handleChange} />
        <input type="text" name="username" placeholder="Usuario" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Correo" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" required onChange={handleChange} />
        <button type='submit'>Registrarse</button>
      </form>
    </div>

  )
}
