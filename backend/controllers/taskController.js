import { PrismaClient } from "@prisma/client";
import { handleException } from "../common/handle_request.js";

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

export class TaskController {

  static getAllTasksByUser = handleException(async (req, res) => {
    // Validar que userId sea un número
    if (!req.params.id || isNaN(parseInt(req.params.id, 10))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: parseInt(req.params.id, 10), // Asegurarse de que userId sea un número
      },
      orderBy: {
        id: 'desc',
      }
    });

    res.status(200).json(tasks);
  })

  static createTask = handleException(async (req, res) => {
    const { title, description, userId } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!title || !description || !userId) {
      return res.status(400).json({ error: 'Title, description and userId are required' });
    }

    //Validar que el tipo de datos sea string
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ error: 'Title and description must be strings' });
    }

    // Validar longitud de los campos
    if (title.trim().length < 3) {
      return res.status(400).json({ error: 'Title must be at least 3 characters' });
    }

    if (description.trim().length < 10) {
      return res.status(400).json({ error: 'Description must be at least 10 characters' });
    }

    // Validar que userId sea un número
    if (isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Crear una nueva tarea
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: parseInt(userId, 10), // Asegurarse de que userId sea un número
      }
    });

    res.status(201).json(newTask);
  })

  static updateTask = handleException(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, userId } = req.body;

    // Validar que taskId sea un número
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Validar que la tarea exista
    const taskExists = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!taskExists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    if (!title && !description && !userId) {
      return res.status(400).json({ error: 'At least one field (title, description or userId) is required to update' });
    }

    // Validar tipos de datos si se envían
    if (title && typeof title !== 'string') {
      return res.status(400).json({ error: 'Title must be a string' });
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string' });
    }

    // Validar que userId sea un número si se envía
    if (userId && isNaN(parseInt(userId, 10))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Validar que el userId exista en la base de datos si se envía
    if (userId) {
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) }
      });

      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    // Validar que los campos de titulo y descripcion no estén vacíos y tengan longitud mínima
    if (title) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      if (title.trim().length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters' });
      }
    }

    if (description) {
      if (description.trim() === '') {
        return res.status(400).json({ error: 'Description cannot be empty' });
      }
      if (description.trim().length < 10) {
        return res.status(400).json({ error: 'Description must be at least 10 characters' });
      }
    }

    // Preparar datos a actualizar
    const updatedData = {};
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (userId) updatedData.userId = parseInt(userId, 10);

    // Actualizar la tarea
    const updatedTask = await prisma.task.update({
      data: updatedData,
      where: { id: taskId },
    });

    res.status(200).json(updatedTask);
  })

  static deleteTask = handleException(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    // Validar que taskId sea un número
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Validar que la tarea exista antes de eliminar
    const taskExists = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!taskExists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Eliminar la tarea
    await prisma.task.delete({
      where: { id: taskId }
    });

    res.status(204).send(); // No content
  })

  // Metodo para cambiar el estado de una tarea
  static changeTaskStatus = handleException(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    // Validar que taskId sea un número
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Validar que la tarea exista
    const taskExists = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!taskExists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Actualizar el estado de la tarea -> Asegurarse de cacmbiar el tipo booleano
    const updatedTask = await prisma.task.update({
      data: {
        completed: !taskExists.completed
      },
      where: { id: taskId },
    });

    res.status(200).json(updatedTask);
  })

  static getfilteredTasks = async (req, res) => {
    console.log(req)
    const { userId } = req.user.id
    const { search = '', completed } = req.query

    try {
      const whereClause = {
        userId,
        title: {
          contains: search,
          mode: 'insensitive',
        },
        ...(completed !== undefined && completed !== ''
          ? { completed: completed === 'true' }
          : {}),
      }

      const tasks = await prisma.task.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      })

      res.json(tasks)
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener tareas' })
    }
  }
}