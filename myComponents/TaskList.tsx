'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
};

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Create mockup',
    description: 'Design UI mockup for client',
    status: 'To Do',
    priority: 'High',
    dueDate: '2023-06-30',
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Set up user authentication system',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2023-07-15',
  },
  {
    id: '3',
    title: 'Write documentation',
    description: 'Document API endpoints',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2023-07-01',
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [sort, setSort] = useState<keyof Task>('dueDate');

  const filteredTasks = tasks
    .filter(
      (task) =>
        (!filter.status ||
          filter.status === 'all' ||
          task.status === filter.status) &&
        (!filter.priority ||
          filter.priority === 'all' ||
          task.priority === filter.priority)
    )
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1));

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      status: value === 'all' ? '' : value,
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      priority: value === 'all' ? '' : value,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Task List</h2>
        <Button>Add New Task</Button>
      </div>
      <div className="flex space-x-4">
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handlePriorityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSort(value as keyof Task)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
