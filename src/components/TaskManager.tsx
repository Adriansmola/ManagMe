import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Grid, Paper } from '@mui/material';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined); // Zmieniono 'null' na 'undefined'
  const [storyId] = useState<string>('defaultStoryId'); // Możesz dostosować to do swoich potrzeb

  useEffect(() => {
    const fetchTasks = () => {
      const allTasks = TaskService.getTasksByStory(storyId);
      setTasks(allTasks);
    };
    fetchTasks();
  }, [storyId]);

  const handleSave = () => {
    const allTasks = TaskService.getTasksByStory(storyId);
    setTasks(allTasks);
    setCurrentTask(undefined); // Ustawia na 'undefined' po zapisaniu
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
  };

  const handleDelete = (id: string) => {
    TaskService.deleteTask(id);
    const allTasks = TaskService.getTasksByStory(storyId);
    setTasks(allTasks);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <TaskForm task={currentTask} storyId={storyId} onSave={handleSave} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} storyId={''} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskManager;
