export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  tasks: Task[];
  team: User[];
  clientId: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  completionDate?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Project Manager' | 'Team Member' | 'Client';
  avatar?: string;
}