import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiService } from "../../service/api";
import Swal from "sweetalert2";

// Crear contexto
const AuthContext = createContext();

// Hook para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Validar si ya hay una sesión activa (esto es lo que mantiene la sesión al recargar)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiService.protected();
        // Si la petición es exitosa, significa que el usuario está autenticado
        setUser(res.data.user); // ✅ Aquí se hidrata el usuario
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // <-- Finaliza loading
      }

    };

    checkAuth();
  }, []);

  // Funcion para modificar el usuario agregado al contexto
  const updateUser = async (id, data) => {
    // Aquí puedes hacer una petición a la API para guardar los cambios
    try {
      const res = await apiService.updateUser(id, data);

      setUser(res.data);
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    } catch (error) {
      console.log(`Error al modificar perfil ${error}`)
      Swal.fire("Error", "Hubo un error al actualizar el perfil", "error");
    }
  }

  // Función de login
  const login = async (data) => {
    let res;
    try {

      res = await apiService.login(data);
      setUser(res.data.user); // ✅ Guardar el usuario después del login
      navigate("/dashboard");
    } catch (error) {
      // Manejo de error al iniciar sesión
      if (error.response?.status === 429) {
        Swal.fire({
          title: "Demasiados intentos",
          text: "Por favor, espera unos minutos e intenta nuevamente.",
          icon: "warning"
        });
      } else if (error.response?.data?.error) {
        Swal.fire({
          title: "Error al iniciar sesión",
          text: "credenciales incorrectas, intentelo otra vez",
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Error al iniciar sesión",
          text: "Ha ocurrido un error inesperado.",
          icon: "error"
        });
      }
    }
  };

  // Función de logout
  const logout = async () => {
    setLoading(true);
    await apiService.logout();
    setUser(null);
    navigate("/"); // Redirigir a la página de inicio después del logout
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout, loading }}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};
