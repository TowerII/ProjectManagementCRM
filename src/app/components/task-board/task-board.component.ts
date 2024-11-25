import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, MatCardModule, DragDropModule],
  template: `
    <div class="task-board">
      <div class="board-column">
        <h3>Pending</h3>
        <div
          cdkDropList
          #pendingList="cdkDropList"
          [cdkDropListData]="pendingTasks"
          [cdkDropListConnectedTo]="[inProgressList, completedList]"
          (cdkDropListDropped)="drop($event)"
          class="task-list"
        >
          <mat-card *ngFor="let task of pendingTasks" cdkDrag class="task-card">
            <mat-card-header>
              <mat-card-title>{{ task.title }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ task.description }}</p>
              <div class="task-meta">
                <span class="priority {{ task.priority.toLowerCase() }}">
                  {{ task.priority }}
                </span>
                <span class="due-date">Due: {{ task.dueDate | date }}</span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="board-column">
        <h3>In Progress</h3>
        <div
          cdkDropList
          #inProgressList="cdkDropList"
          [cdkDropListData]="inProgressTasks"
          [cdkDropListConnectedTo]="[pendingList, completedList]"
          (cdkDropListDropped)="drop($event)"
          class="task-list"
        >
          <mat-card *ngFor="let task of inProgressTasks" cdkDrag class="task-card">
            <!-- Similar task card content -->
          </mat-card>
        </div>
      </div>

      <div class="board-column">
        <h3>Completed</h3>
        <div
          cdkDropList
          #completedList="cdkDropList"
          [cdkDropListData]="completedTasks"
          [cdkDropListConnectedTo]="[pendingList, inProgressList]"
          (cdkDropListDropped)="drop($event)"
          class="task-list"
        >
          <mat-card *ngFor="let task of completedTasks" cdkDrag class="task-card">
            <!-- Similar task card content -->
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-board {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 20px;
    }
    .board-column {
      background: #f5f5f5;
      border-radius: 4px;
      padding: 15px;
    }
    .task-list {
      min-height: 400px;
    }
    .task-card {
      margin-bottom: 10px;
      cursor: move;
    }
    .task-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .priority {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
    }
    .priority.high { background: #ffebee; color: #c62828; }
    .priority.medium { background: #fff3e0; color: #ef6c00; }
    .priority.low { background: #e8f5e9; color: #2e7d32; }
  `]
})
export class TaskBoardComponent {
  @Input() projectId!: string;
  
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private projectService: ProjectService) {}

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      const task = event.container.data[event.currentIndex];
      let newStatus: Task['status'];
      
      if (event.container.id === 'pendingList') newStatus = 'Pending';
      else if (event.container.id === 'inProgressList') newStatus = 'In Progress';
      else newStatus = 'Completed';
      
      this.projectService.updateTaskStatus(this.projectId, task.id, newStatus);
    }
  }
}