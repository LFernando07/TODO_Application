import { useState } from "react";
import { apiService } from '../../service/api';
import Swal from 'sweetalert2'


export const Register = () => {
  // Manejo de un estado para campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });


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

      Swal.fire({
        title: "Cuenta creada exitosamente!",
        text: "Inicia Sesion!",
        icon: "success"
      });

      //Limpiamos el formulario
      setFormData({
        name: '',
        username: '',
        email: '',
        password: ''
      });

    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Aquí podrías manejar errores, como mostrar un mensaje al usuario
    }

  }

  return (
    <div className="signup">
      <form onSubmit={handleRegister}>
        <label className="label-txt" htmlFor="chk" aria-hidden="true">Registro</label>
        <input className="entrada" type="text" name="name" placeholder="Nombre Completo" required onChange={handleChange} />
        <input className="entrada" type="text" name="username" placeholder="Usuario" required onChange={handleChange} />
        <input className="entrada" type="email" name="email" placeholder="Correo" required onChange={handleChange} />
        <input className="entrada" type="password" name="password" placeholder="Contraseña" required onChange={handleChange} />
        <button type='submit' className="btn-action">Registrarse</button>
      </form>
    </div>

  )
}
