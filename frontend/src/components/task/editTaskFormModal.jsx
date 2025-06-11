import React, { useState, useEffect, forwardRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Slide
} from '@mui/material';
import { apiService } from '../../service/api';
import { useTask } from '../../hooks/context/taskContext';
import Swal from 'sweetalert2';

// Animación de entrada/salida tipo Slide
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditTaskForm = ({ open, handleClose, task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const { fetchTasks } = useTask();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateTask(task.id, { title, description });
      fetchTasks();
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
      handleClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Hubo un error al actualizar la tarea", "error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
