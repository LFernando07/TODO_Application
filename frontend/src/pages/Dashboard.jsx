import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Search } from '../components/layout/Search';
import { ListTask } from '../components/task/ListTask';
import '../styles/Dashboard.css';
// import { apiService } from '../service/api';
// import { useAuth } from '../hooks/context/authContext';
import { useTask } from '../hooks/context/taskContext';


export const Dashboard = () => {
  // Estados que se heredaran hacia los componentes hijos (Search & ListTask)
  // const { user } = useAuth();

  const { tasks, fetchTasks } = useTask();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = ({ title, completed }) => {
    const isTitleEmpty = title.trim() === "";
    const isCompletedEmpty = completed === "";

    // Si ambos están vacíos, mostrar todo
    if (isTitleEmpty && isCompletedEmpty) {
      setFilteredTasks(tasks);
      setHasSearched(false);
      return;
    }

    let filtered = tasks;

    if (!isTitleEmpty) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(title.trim().toLowerCase())
      );
    }

    if (!isCompletedEmpty) {
      filtered = filtered.filter(task =>
        String(task.completed) === completed
      );
    }

    setFilteredTasks(filtered);
    setHasSearched(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="dashboard-container">
      <div className="item d-header">
        {/* Navbar personalizado */}
        <Navbar />
      </div>
      <div className="item d-content">
        {/* Content del dashboard */}
        <Search
          onSearch={handleSearch}
        />
      </div>
      <div className="item d-footer">
        {
          hasSearched ? <ListTask
            tasks={filteredTasks}
          /> :
            <ListTask
              tasks={tasks}
            />
        }

      </div>
    </div>
  );
}