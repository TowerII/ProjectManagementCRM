import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="projects-container">
      <h2>Projects Overview</h2>
      <div class="project-grid">
        <mat-card *ngFor="let project of projects" class="project-card">
          <mat-card-header>
            <mat-card-title>{{ project.name }}</mat-card-title>
            <mat-card-subtitle>Status: {{ project.status }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ project.description }}</p>
            <div class="project-stats">
              <div>Tasks: {{ project.tasks.length }}</div>
              <div>Completed: {{ getCompletedTasksCount(project) }}</div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="viewProject(project)">View Details</button>
            <button mat-button (click)="editProject(project)">Edit</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      padding: 20px;
    }
    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .project-card {
      margin-bottom: 20px;
    }
    .project-stats {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  getCompletedTasksCount(project: Project): number {
    return project.tasks.filter(task => task.status === 'Completed').length;
  }

  viewProject(project: Project) {
    // Implement navigation to project details
  }

  editProject(project: Project) {
    // Implement project editing
  }
}