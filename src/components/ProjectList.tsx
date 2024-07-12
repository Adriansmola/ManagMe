// src/components/ProjectList.tsx

import React from 'react';
import { Project } from '../models/Project';
import { Button, Card, CardContent, Typography } from '@mui/material';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onSelect: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, onSelect }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Project List
      </Typography>
      {projects.map(project => (
        <Card key={project.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{project.name}</Typography>
            <Typography>{project.description}</Typography>
            <Button variant="contained" color="primary" onClick={() => onEdit(project)} sx={{ marginRight: 1 }}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => onSelect(project)} sx={{ marginRight: 1 }}>
              Select Project
            </Button>
            <Button variant="contained" color="error" onClick={() => onDelete(project.id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
