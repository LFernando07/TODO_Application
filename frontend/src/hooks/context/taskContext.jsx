import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "../../service/api";
import { useAuth } from "./authContext";

// Crear un contexto
const TaskContext = createContext();

// Hook para acceder al contexto de las tareas
export const useTask = () => useContext(TaskContext);

// Componente Provider para detectar cambios
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await apiService.getAllTasksByUser(user.id)
      setTasks(res.data)
    } catch (error) {
      console.log(`Error al hacer fetching tasks ${error}`)
    }
  }

  // Efecto de cambio
  useEffect(() => {
    fetchTasks();
  }, [user.id])

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }} >
      {children}
    </TaskContext.Provider>
  )
}