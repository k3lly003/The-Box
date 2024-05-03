'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Files, LogOut, Menu, Star, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const SideBar = (props: Props) => {
  
  const dispatch = useAppDispatch();
  
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  
  const toogleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassName = `fixed flex flex-col justify-evenly ${isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'} bg-white transition-all duration-500 overflow-hidden h-full shadow-md z-40`

  return (
    <div className={sidebarClassName}>
        {/* TOP LOGO */}
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <div>FD</div>
            <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-2xl`}>F.DRIVE</h1>
            <button className='md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toogleSidebar}>
            <Menu className='w-4 h-4' size={24}/>
        </button>
        </div>
        {/* LINKS */}
        <div className='flex-grow mt-8'>
          <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 hover:text-green-300 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <Files className='w-4 h-4' size={24}/>
            <Link href="#" className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-lg  flex justify-center`}>All Files</Link>
          </div>
          <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 hover:text-green-300 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <Star className='w-4 h-4' size={24}/>
            <Link href="#" className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-lg  flex justify-center`}>Favorites</Link>
          </div>
          <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 hover:text-green-300 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <Trash className='w-4 h-4' size={24}/>
            <Link href="#" className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-lg  flex justify-center`}>Trash</Link>
          </div>
        </div>
        <div>
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 hover:text-red-300 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <LogOut className='w-4 h-4' size={24}/>
            <Link href="#" className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-lg  flex justify-center`}>Logout</Link>
          </div>
        </div>
        {/* FOOTER */}
        <div>
            <p className='text-center text-xs text-gray-500'>&copy; 2024 ntirushwa</p>
        </div>
    </div>
  )
}

export default SideBar