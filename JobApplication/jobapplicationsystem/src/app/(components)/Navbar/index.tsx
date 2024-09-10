"use client";
import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  label: string;
}

const NavbarLink = ({ href, label }: NavbarLinkProps) => {
  return (
    <Link href={href}>
      <div className="cursor-pointer flex items-center gap-3">
        {/* I've put '!' to make it over ride any other css style */}
        <span className="font-medium text-gray-700 hover:text-red-600">{label}</span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full mb-7 bg-gray-200 p-3">
      {/* LEFT SIDE */}
      <div>
        <h2 className="text-lg font-bold">JOB APPLY SYSTEM</h2>
      </div>
      <NavbarLink href="/" label="Home" />

      <NavbarLink href="/dashboard" label="Dashboard" />
      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute top-2 right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
