// src/services/StoryService.ts

import { Story } from '../models/Story';
import { TaskService } from './TaskService'; // Dodaj to

let stories: Story[] = [];

export class StoryService {
  static addStory(story: Story) {
    stories.push(story);
  }

  static updateStory(updatedStory: Story) {
    stories = stories.map(story => story.id === updatedStory.id ? updatedStory : story);
  }

  static deleteStory(id: string) {
    stories = stories.filter(story => story.id !== id);
    TaskService.getTasksByStory(id).forEach(task => TaskService.deleteTask(task.id)); // Dodaj to
  }

  static getStoriesByProject(projectId: string): Story[] {
    return stories.filter(story => story.projectId === projectId);
  }

  static getStoryById(storyId: string): Story | undefined {
    return stories.find(story => story.id === storyId);
  }
}
