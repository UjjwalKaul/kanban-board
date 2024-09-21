import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { Label } from '@/components/ui/label';
import Sidebar from '@/myComponents/Sidebar';
import Logout from '@/myComponents/Logout';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-1/6 h-full bg-gray-800 p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={session?.user?.image || ' '} />
            <AvatarFallback className="text-3xl text-black font-bold cursor-pointer">
              {session?.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Label className="text-2xl text-white capitalize">
            {session?.user?.name}
          </Label>
        </div>
        <div>
          <Sidebar />
        </div>
        <div>
          <Logout />
        </div>
      </aside>

      <section className="w-5/6 text-black bg-white p-4 overflow-auto">
        {children}
      </section>
    </div>
  );
};

export default DashboardLayout;
