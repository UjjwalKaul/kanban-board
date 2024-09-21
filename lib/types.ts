export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
};

export interface AddTask {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed' | '';
  priority: 'Low' | 'Medium' | 'High' | '';
  dueDate: string;
}
