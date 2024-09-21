import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { Label } from '@/components/ui/label';
import Sidebar from '@/myComponents/Sidebar';
import Logout from '@/myComponents/Logout';
import Link from 'next/link';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <aside className="w-1/4 md:w-1/6 h-full bg-gray-800 p-4 flex flex-col items-center">
        <h1 className="hidden md:block md:text-3xl md:text-center font-bold m-4">
          Task Dashboard
        </h1>
        <div className="flex flex-col items-center space-y-2">
          <Link href="/">
            <Avatar className="w-10 h-10 md:w-20 md:h-20">
              <AvatarImage src={session?.user?.image || ' '} />
              <AvatarFallback className="md:text-3xl text-black font-bold cursor-pointer">
                {session?.user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>

          <Label className="text-lg md:text-2xl text-white capitalize">
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

      <section className="w-3/4 md:w-5/6 text-black bg-white p-4 overflow-auto">
        {children}
      </section>
    </div>
  );
};

export default DashboardLayout;
