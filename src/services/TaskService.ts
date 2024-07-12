import { Task } from '../models/Task';

let tasks: Task[] = [];

export class TaskService {
  static addTask(task: Task) {
    tasks.push(task);
  }

  static updateTask(updatedTask: Task) {
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
  }

  static deleteTask(id: string) {
    tasks = tasks.filter(task => task.id !== id);
  }

  static getTasksByStory(storyId: string): Task[] {
    return tasks.filter(task => task.storyId === storyId);
  }

  static completeTask(id: string) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.status = 'done';
      task.endDate = new Date(); // Ustawienie daty zakończenia
      this.updateTask(task);
    }
  }
}