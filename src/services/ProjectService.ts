// src/services/ProjectService.ts

import { Project } from '../models/Project';

const STORAGE_KEY = 'projects';
const ACTIVE_PROJECT_KEY = 'activeProject';

export class ProjectService {
  static getProjects(): Project[] {
    const projects = localStorage.getItem(STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  }

  static getProjectById(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find(project => project.id === id);
  }

  static addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static updateProject(updatedProject: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }

  static deleteProject(id: string): void {
    let projects = this.getProjects();
    projects = projects.filter(project => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static setActiveProject(id: string): void {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  }

  static getActiveProject(): Project | undefined {
    const activeProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY);
    return activeProjectId ? this.getProjectById(activeProjectId) : undefined;
  }
}
