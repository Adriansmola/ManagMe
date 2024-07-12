import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { TaskService } from '../services/TaskService';
import { UserService } from '../services/UserService';
import { ProjectService } from '../services/ProjectService';
import { TextField, Button, Paper, Typography, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent, CircularProgress } from '@mui/material';
import { User } from '../models/User';

interface TaskFormProps {
  task?: Task; // Zmieniono typ na Task | undefined
  storyId: string;
  onSave: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, storyId, onSave }) => {
  const [name, setName] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [ownerId, setOwnerId] = useState(task ? task.ownerId : '');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(task ? task.status : 'todo');
  const [estimatedHours, setEstimatedHours] = useState<number | undefined>(task ? task.estimatedHours : undefined);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<User[]>([]);
  const activeProject = ProjectService.getActiveProject();
  const projectName = activeProject ? activeProject.name : '';

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await UserService.getUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleOwnerChange = (event: SelectChangeEvent<string>) => {
    const newOwnerId = event.target.value as string;
    setOwnerId(newOwnerId);

    if (newOwnerId === '') {
      setStatus('todo');
    } else {
      setStatus('doing');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalStatus = ownerId === '' ? 'todo' : status;

    const newTask: Task = {
      id: task ? task.id : new Date().toISOString(),
      name,
      description,
      storyId,
      ownerId,
      status: finalStatus,
      projectName,
      startDate: task ? task.startDate : (finalStatus === 'doing' ? new Date() : undefined),
      estimatedHours,
    };

    if (task) {
      TaskService.updateTask(newTask);
    } else {
      TaskService.addTask(newTask);
    }

    onSave();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {task ? 'Edit Task' : 'Add Task'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="doing">Doing</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="ownerId">Owner</InputLabel>
          <Select
            value={ownerId}
            onChange={handleOwnerChange}
            inputProps={{
              name: 'ownerId',
              id: 'ownerId',
            }}
          >
            <MenuItem value="">None</MenuItem>
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Estimated Hours"
          type="number"
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(parseFloat(e.target.value))}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default TaskForm;
