import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { TaskService } from '../services/TaskService';

interface TaskListProps {
  tasks: Task[];
  storyId: string; // Dodane storyId jako props
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, storyId, onEdit, onDelete }) => {
  const usersMap: Map<string, User> = new Map(UserService.getUsers().map(u => [u.id, u]));
  const [updatedTasks, setUpdatedTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setUpdatedTasks(tasks);
  }, [tasks]);

  const handleCompleteTask = (id: string) => {
    TaskService.completeTask(id);
    const updatedTaskList = TaskService.getTasksByStory(storyId); // Zmieniono na filtr po storyId
    setUpdatedTasks(updatedTaskList);
  };

  const handleHide = () => {
    const tasksForStory = TaskService.getTasksByStory(storyId);
    setUpdatedTasks(tasksForStory);
  };

  const handleShowAllTasks = () => {
    setUpdatedTasks(tasks); // Przywrócenie wszystkich zadań
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleHide} sx={{ marginRight: 2 }}>
          Hide
        </Button>
        <Button variant="contained" color="primary" onClick={handleShowAllTasks}>
          Show All Tasks
        </Button>
      </Grid>
      {updatedTasks.map(task => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">{task.name}</Typography>
              <Typography>{task.description}</Typography>
              <Typography>Status: {task.status}</Typography>
              <Typography>Owner: {usersMap.get(task.ownerId)?.firstName} {usersMap.get(task.ownerId)?.lastName}</Typography>
              <Typography>Project: {task.projectName}</Typography>
              <Typography>Start Date: {task.startDate ? new Date(task.startDate).toLocaleString() : 'Not started'}</Typography>
              <Typography>Estimated Hours: {task.estimatedHours}</Typography>
              {task.status === 'done' && (
                <Typography>End Date: {task.endDate ? new Date(task.endDate).toLocaleString() : 'Not completed'}</Typography>
              )}
              {task.status !== 'done' && (
                <Button variant="contained" color="primary" onClick={() => handleCompleteTask(task.id)} sx={{ marginRight: 1 }}>
                  Complete Task
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={() => onEdit(task)} sx={{ marginRight: 1 }}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => onDelete(task.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
