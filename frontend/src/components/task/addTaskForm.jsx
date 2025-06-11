import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { apiService } from '../../service/api.js';
import { useAuth } from '../../hooks/context/authContext';
import { useTask } from '../../hooks/context/taskContext';
import Swal from 'sweetalert2'
import '../../styles/TaskFormCreated.css';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTaskForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Estados del formulario
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const { user } = useAuth()
  const { fetchTasks } = useTask()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.createTask({
        title: title,
        description: description,
        userId: user.id
      })

      // Recargar las tareas
      fetchTasks();

      //Limpiar campos
      setTitle("");
      setDescription("");

      // Cierra el dialog
      handleClose()

      // Mostrar alerta de éxito
      Swal.fire({
        title: "Bien Hecho!",
        text: "Tarea creada exitosamente!",
        icon: "success"
      });

    } catch (error) {
      console.log(`Error al crear una nueva tarea ${error}`)
    }
  }

  const AppBarPersonalized = styled(AppBar)({
    backgroundImage: 'linear-gradient(90deg, #A16836FF 0%, #BC8A67FF 100%)',
  });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        color='info'
        onClick={handleClickOpen}
      >
        <p style={{ color: 'white' }}>
          Nueva tarea

        </p>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBarPersonalized sx={{ position: 'relative' }}>
          <Toolbar>
            <Button
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBarPersonalized>
        {/* Content del form */}
        <form className='task-form' onSubmit={handleSubmit}>
          <input
            className='task-form-title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título"
            required
          />

          <textarea
            className='task-form-description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descripcion"
            required
          />
          <button type="submit" className='add-task'>Crear Tarea</button>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
