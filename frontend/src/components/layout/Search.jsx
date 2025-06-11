import { useState, useEffect } from "react";
import '../../styles/Search.css';
import AddTaskForm from "../task/addTaskForm";

export const Search = ({ onSearch }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("");

  useEffect(() => {
    // Llamar a onSearch automáticamente cuando se escribe o cambia el select
    const delay = setTimeout(() => {
      onSearch({ title, completed });
    }, 300); // Pequeño retraso para evitar llamadas excesivas

    return () => clearTimeout(delay);
  }, [title, completed]);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-search"
        />
        <select
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
          className="select-search"
        >
          <option value="">Todas</option>
          <option value="true">Completadas</option>
          <option value="false">Pendientes</option>
        </select>

        {/* Formulario para crear una nota nueva  */}
        <AddTaskForm />
      </div>
    </>
  );
}
