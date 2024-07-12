import React, { useState, useEffect } from 'react';
import { Story } from '../models/Story';
import { StoryService } from '../services/StoryService';
import { TaskService } from '../services/TaskService';
import { UserService } from '../services/UserService';
import { ProjectService } from '../services/ProjectService';
import { TextField, Button, Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { User } from '../models/User';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../models/Task';

interface StoryFormProps {
  story?: Story;
  onSave: () => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSave }) => {
  const [name, setName] = useState(story ? story.name : '');
  const [description, setDescription] = useState(story ? story.description : '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(story ? story.priority : 'low');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(story ? story.status : 'todo');
  const [ownerId, setOwnerId] = useState<string>(story ? story.ownerId : '');
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const activeProject = ProjectService.getActiveProject();
  const users: User[] = UserService.getUsers();
  const tasks: Task[] = story ? TaskService.getTasksByStory(story.id) : [];

  useEffect(() => {
    setName(story ? story.name : '');
    setDescription(story ? story.description : '');
    setPriority(story ? story.priority : 'low');
    setStatus(story ? story.status : 'todo');
    setOwnerId(story ? story.ownerId : '');
  }, [story]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeProject) {
      return;
    }

    const newStory: Story = {
      id: story ? story.id : new Date().toISOString(),
      name,
      description,
      priority,
      projectId: activeProject.id,
      createdAt: story ? story.createdAt : new Date().toISOString(),
      status,
      ownerId,
    };

    if (story) {
      StoryService.updateStory(newStory);
    } else {
      StoryService.addStory(newStory);
    }

    onSave();
  };

  const handleTaskSave = () => {
    setSelectedTask(undefined);
    onSave();
  };

  const handleTaskEdit = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskDelete = (taskId: string) => {
    TaskService.deleteTask(taskId);
    onSave();
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {story ? 'Edit Story' : 'Add Story'}
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
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
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
        <FormControl fullWidth required margin="normal">
          <InputLabel htmlFor="ownerId">Owner</InputLabel>
          <Select
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value as string)}
            inputProps={{
              name: 'ownerId',
              id: 'ownerId',
            }}
          >
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          Save
        </Button>
      </form>

      {story && (
        <>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
            Tasks
          </Typography>
          <TaskList tasks={tasks} onEdit={handleTaskEdit} onDelete={handleTaskDelete} storyId={story.id} />
          <TaskForm storyId={story.id} task={selectedTask} onSave={handleTaskSave} />
        </>
      )}
    </Paper>
  );
};

export default StoryForm;
