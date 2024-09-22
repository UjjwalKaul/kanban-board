'use client';
import { useEffect, useState } from 'react';
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import AddTask from './AddTask';
import { Task } from '@/lib/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [sort, setSort] = useState<keyof Task>('dueDate');
  const session = useSession();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
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

  const handleDelete = async (id: string) => {
    await axios.delete(
      `/api/add?taskId=${id}&userEmail=${session.data?.user?.email}`
    );
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
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Task List</h1>
        <div className="w-20">
          <AddTask getNew={fetchTasks} />
        </div>
      </div>
      <div className="flex">
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TO_DO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handlePriorityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
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
      <div>
        <Table>
          <TableCaption>A list of your recent tasks.</TableCaption>
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
            {filteredTasks.map((task) => {
              return (
                <TableRow key={task.id} className="text-lg">
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-4">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-2 w-2" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(task.id)}>
                        <Trash2 className="h-2 w-2" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
