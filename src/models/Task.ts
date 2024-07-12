export interface Task {
  id: string;
  name: string;
  description: string;
  storyId: string;
  ownerId: string;
  status: 'todo' | 'doing' | 'done';
  projectName: string;
  startDate?: Date;
  estimatedHours?: number;
  endDate?: Date; // Dodane pole endDate
}
