"use client";

import Navbar from "@/app/(components)/Navbar/index";
import SideBar from "@/app/(components)/SideBar";
import StoreProvider, { useAppSelector } from "./redux";
import { ThemeProvider } from "@/components/ui/theme-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
      <div className="flex w-full min-h-screen bg-background text-foreground">
        <SideBar />
        <main
          className={`flex-col w-full py-7 px-9 bg-gray-50 dark:bg-gray-800 ${
            isSidebarCollapsed ? "md:pl-24" : "md:pl-80"
          }`}
        >
          <Navbar />
          {children}
        </main>
      </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
     <StoreProvider>
        <DashboardLayout>{children}</DashboardLayout>
     </StoreProvider>
    </ThemeProvider>
  );
};

export default DashboardWrapper;
