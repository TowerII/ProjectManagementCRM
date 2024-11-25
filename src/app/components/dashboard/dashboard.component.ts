import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="dashboard-container">
      <div class="stats-grid">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Total Projects</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ totalProjects }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Active Projects</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ activeProjects }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Completed Projects</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ completedProjects }}</h2>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    mat-card {
      text-align: center;
    }
    h2 {
      font-size: 2.5em;
      margin: 0;
      color: var(--primary-color);
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalProjects = 0;
  activeProjects = 0;
  completedProjects = 0;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.totalProjects = projects.length;
      this.activeProjects = projects.filter(p => p.status === 'In Progress').length;
      this.completedProjects = projects.filter(p => p.status === 'Completed').length;
    });
  }
}