import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { Label } from '@/components/ui/label';
import Sidebar from '@/myComponents/Sidebar';
import Logout from '@/myComponents/Logout';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex h-screen">
      <aside className="w-1/6 bg-gray-800 p-4">
        <div className="h-full flex flex-col space-y-10 items-center justify-between">
          <div id="Avatar Section" className="flex flex-col space-y-1">
            <Avatar className="w-20 h-20">
              <AvatarImage src={session?.user?.image || ' '} />
              <AvatarFallback className="text-3xl text-black font-bold cursor-pointer">
                {session?.user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <Label className="text-2xl text-white capitalize">
                {session?.user?.name}
              </Label>
            </div>
          </div>
          <div id="Sidebar-Options">
            <Sidebar />
          </div>

          <div id="Logout-Button">
            <Logout />
          </div>
        </div>
      </aside>

      <section className="w-5/6 text-black bg-white p-4">{children}</section>
    </div>
  );
};

export default DashboardLayout;
