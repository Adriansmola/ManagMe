// src/components/ProjectForm.tsx

import React, { useState, useEffect } from 'react';
import { Project } from '../models/Project';
import { ProjectService } from '../services/ProjectService';
import { TextField, Button, Paper, Typography } from '@mui/material';

interface ProjectFormProps {
  project?: Project;
  onSave: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: project ? project.id : new Date().toISOString(),
      name,
      description,
    };

    if (project) {
      ProjectService.updateProject(newProject);
    } else {
      ProjectService.addProject(newProject);
    }

    setName('');
    setDescription('');
    onSave();
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        {project ? 'Edit Project' : 'Add Project'}
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
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default ProjectForm;
