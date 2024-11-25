import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, Task } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects = new BehaviorSubject<Project[]>([]);

  getProjects(): Observable<Project[]> {
    return this.projects.asObservable();
  }

  addProject(project: Project): void {
    const currentProjects = this.projects.getValue();
    this.projects.next([...currentProjects, project]);
  }

  updateProject(updatedProject: Project): void {
    const currentProjects = this.projects.getValue();
    const index = currentProjects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      currentProjects[index] = updatedProject;
      this.projects.next([...currentProjects]);
    }
  }

  updateTaskStatus(projectId: string, taskId: string, status: Task['status']): void {
    const currentProjects = this.projects.getValue();
    const project = currentProjects.find(p => p.id === projectId);
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
        if (status === 'Completed') {
          task.completionDate = new Date();
        }
        this.updateProject(project);
      }
    }
  }
}