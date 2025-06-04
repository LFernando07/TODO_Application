import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { apiService } from "../../service/api";

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
        const res = await axios.get("http://localhost:1234/api/auth/protected", {
          withCredentials: true
        });
        setUser(res.data.user); // ✅ Aquí se hidrata el usuario
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // <-- Finaliza loading
      }

    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (data) => {
    setLoading(true);
    const res = await apiService.login(data);
    setUser(res.data.user); // ✅ Guardar el usuario después del login
    setLoading(false);
    navigate("/profile");
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};
