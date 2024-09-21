import { Layout, List } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="p-4">
      <ul className="space-y-4">
        <li className="py-2 px-4 border border-gray-300 rounded-md bg-red-500">
          <Link
            href="/dashboard/tasklist"
            className="flex items-center space-x-2">
            <List size={20} />
            <span className="hidden md:block">Task List</span>
          </Link>
        </li>
        <li className="py-2 px-4 border border-gray-300 rounded-md">
          <Link
            href="/dashboard/kanban"
            className="flex items-center space-x-2">
            <Layout size={20} />
            <span className="hidden md:block">Kanban Board</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
