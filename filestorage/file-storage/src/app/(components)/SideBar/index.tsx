"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { LucideIcon, Menu, File, Star, Trash, LogOut, Package, CircleHelp, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  hoverColor?: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  // hoverColor = "blue-500",
}: SidebarLinkProps) => {
  const pathname = usePathname(); //This help use to know / determine which path / page or url we're on
  const isActive =
    pathname === href || (pathname === "/" && href === "/myfiles");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
       hover:text-white hover:bg-green-200 dark:hover:bg-green-700 gap-3 transition-colors ${
         isActive ? "bg-green-200 text-red" : ""
       } hover:text-white`}
      >
        {/* I've put '!' to make it over ride any other css style */}
        <Icon className="w-6 h-6 !text-gray-700 dark:!text-gray-500" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 dark:text-gray-500`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toogleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassName = `fixed flex flex-col bg-white dark:bg-gray-800 ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  }transition-all duration-500 overflow-hidden h-full shadow-md dark:shadow-2xl`;

  return (
    <div className={sidebarClassName}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>
         <Package color="#6bc6ff" />
        </div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          NBSTOCK
        </h1>
        <button
          className="md:hidden p-3 rounded-full hover:bg-blue-300 dark:hover:bg-blue-600"
          onClick={toogleSidebar}
        >
          <Menu className="w-4 h-4" size={24} />
        </button>
      </div>
      {/* LINKS */}
      <div className="flex-grow mt-8 flex flex-col">
        {/* DASHBOARD LINK */}
       <div className="">
         <SidebarLink href="/" icon={File} label="My Cloud" isCollapsed={isSidebarCollapsed}/>

         <SidebarLink href="/favorites" icon={Star} label="Favorites" isCollapsed={isSidebarCollapsed}/>

         <SidebarLink href="/trash" icon={Trash} label="Trash" isCollapsed={isSidebarCollapsed}/>
       </div>
          <hr className="border border-solid border-gray-300 my-10 w-[80%] flex self-center"/>
       <div className="h-[70%]">
         <SidebarLink href="/help" icon={CircleHelp} label="Help" isCollapsed={isSidebarCollapsed}/>
         <SidebarLink href="/settings" icon={Settings} label="Settings" isCollapsed={isSidebarCollapsed}/>
       </div>

       <div className="h-[30%]">
         <SidebarLink href="/logout" icon={LogOut} label="Logout" isCollapsed={isSidebarCollapsed}/>
       </div>

      </div>
      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 ntirushwa
        </p>
      </div>
    </div>
  );
};

export default SideBar;
