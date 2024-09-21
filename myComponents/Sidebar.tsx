import { Layout, List } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="p-4">
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard/tasklist"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <List size={20} />
            <span className="hidden md:block">Task List</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/kanban"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <Layout size={20} />
            <span className="hidden md:block">Kanban Board</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
