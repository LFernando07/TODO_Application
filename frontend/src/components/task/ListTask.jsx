import { Task } from './Task.jsx';
import { useState } from 'react';
import '../../styles/ListTask.css';
import { EditTaskForm } from './editTaskFormModal.jsx';

export const ListTask = ({ tasks }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenEdit = (task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleCloseEdit = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  if (tasks.length === 0) {
    return <p className="message">No se encontraron coincidencias.</p>;
  }

  return (
    <div>
      <ul className="task-list-container">
        {tasks.map(task => (
          <Task task={task} key={task.id} onEdit={handleOpenEdit} />
        ))}
      </ul>

      {selectedTask && (
        <EditTaskForm
          open={openModal}
          handleClose={handleCloseEdit}
          task={selectedTask}
        />
      )}
    </div>
  );
};

