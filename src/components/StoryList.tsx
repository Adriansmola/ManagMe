import React from 'react';
import { Story } from '../models/Story';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

interface StoryListProps {
  stories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onEdit, onDelete }) => {
  const usersMap: Map<string, User> = new Map(UserService.getUsers().map(u => [u.id, u]));

  // Sortowanie historii względem priorytetów: high -> medium -> low
  const sortedStories = stories.slice().sort((a, b) => {
    if (a.priority === 'high' && (b.priority === 'medium' || b.priority === 'low')) {
      return -1;
    }
    if (a.priority === 'medium' && b.priority === 'low') {
      return -1;
    }
    if (a.priority === 'low' && (b.priority === 'medium' || b.priority === 'high')) {
      return 1;
    }
    return 0;
  });

  const renderStoriesByStatus = (status: 'todo' | 'doing' | 'done') => {
    const filteredStories = sortedStories.filter(story => story.status === status);

    return (
      <Grid container spacing={2}>
        {filteredStories.map(story => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{story.name}</Typography>
                <Typography>{story.description}</Typography>
                <Typography>Priority: {story.priority}</Typography>
                <Typography>Status: {story.status}</Typography>
                <Typography>Created At: {new Date(story.createdAt).toLocaleDateString()}</Typography>
                <Typography>Owner: {usersMap.get(story.ownerId)?.firstName} {usersMap.get(story.ownerId)?.lastName}</Typography>
                <Button variant="contained" color="primary" onClick={() => onEdit(story)} sx={{ marginRight: 1 }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => onDelete(story.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Stories
      </Typography>
      <Typography variant="h6" gutterBottom>
        To Do
      </Typography>
      {renderStoriesByStatus('todo')}
      <Typography variant="h6" gutterBottom>
        Doing
      </Typography>
      {renderStoriesByStatus('doing')}
      <Typography variant="h6" gutterBottom>
        Done
      </Typography>
      {renderStoriesByStatus('done')}
    </div>
  );
};

export default StoryList;
