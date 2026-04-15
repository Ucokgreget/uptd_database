import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 font-['Inter',sans-serif]">
        <AppSidebar />

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="md:hidden flex items-center p-4 bg-white border-b border-slate-200 shadow-sm z-10 sticky top-0">
            <SidebarTrigger className="mr-3" />
            <img
              src="/Logo.png"
              alt="Logo UPTD"
              className="h-8 object-contain"
            />
          </div>

          <div className="flex-1 p-6 md:p-10 overflow-auto">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
