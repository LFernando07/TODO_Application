import '../../styles/Task.css';
import { apiService } from '../../service/api';
import { useTask } from '../../hooks/context/taskContext';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Swal from 'sweetalert2';

export const Task = ({ task, onEdit }) => {

  const { fetchTasks } = useTask();


  //Llamamos a la funcion cada que existe una tarea
  //Cambio de propiedad de estado de la task
  const handleChangeStatus = async () => {
    try {
      await apiService.changeTaskStatus(task.id)

      //Recargamos las tasks
      fetchTasks()

    } catch (error) {
      console.log(`Error al competar una tarea ${error}`)
    }
  }

  //funcion para eliminar una tarea
  const handleDelete = async (id) => {
    // Generar modal
    Swal.fire({
      title: "Quieres eliminar esta tarea?",
      text: "No podrás recuperarla después de eliminarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminamos la nota
        await apiService.deleteTask(id);

        // Recarga las tasks
        fetchTasks();

        Swal.fire({
          title: "Eliminada!",
          text: "Tu tarea ha sido eliminada exitosamente.",
          icon: "success"
        });
      }
    });
  }


  return (
    <div className={task.completed ? "tarea-contenedor completada" : "tarea-contenedor"}>
      <div className='task-item tarea-texto' onClick={handleChangeStatus} id={task.id} >
        <p className='task-title'>{task.title}</p>
      </div>
      <div className="controls">
        <a
          className="icon-task"
          onClick={() => onEdit(task)}
          title="Editar"
        >
          <BorderColorIcon />
        </a>
        <a className="icon-task"
          onClick={() => handleDelete(task.id)}
          title="Eliminar"
        >
          <DeleteSweepIcon />
        </a>
      </div>

    </div>
  )
}
