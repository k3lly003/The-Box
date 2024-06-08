"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { LucideIcon, Menu, LayoutDashboard, User, Clipboard, SlidersHorizontal, CircleDollarSign, Archive } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname(); //This help use to know / determine which path / page or url we're on
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
       hover:text-white hover:bg-green-200 gap-3 transition-colors ${
         isActive ? "bg-green-200 text-red" : ""
       }`}
      >
        {/* I've put '!' to make it over ride any other css style */}
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
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

  const sidebarClassName = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-500 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassName}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          NBSTOCK
        </h1>
        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toogleSidebar}
        >
          <Menu className="w-4 h-4" size={24} />
        </button>
      </div>
      {/* LINKS */}
      <div className="flex-grow mt-8">
        {/* DASHBOARD LINK */}
       <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" isCollapsed={isSidebarCollapsed}/>

       <SidebarLink href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSidebarCollapsed}/>

       <SidebarLink href="/products" icon={Clipboard} label="Products" isCollapsed={isSidebarCollapsed}/>

       <SidebarLink href="/users" icon={User} label="Users" isCollapsed={isSidebarCollapsed}/>

       <SidebarLink href="/settings" icon={SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed}/>

       <SidebarLink href="/expenses" icon={CircleDollarSign} label="Expenses" isCollapsed={isSidebarCollapsed}/>
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
