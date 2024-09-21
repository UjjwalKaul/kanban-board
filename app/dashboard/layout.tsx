const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-1/6 bg-gray-800 text-white p-4">
        <div className="flex flex-col space-y-8 items-center"></div>
      </aside>

      <section className="w-5/6 text-black bg-white p-4">{children}</section>
    </div>
  );
};

export default DashboardLayout;
