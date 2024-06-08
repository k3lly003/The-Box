'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Menu } from 'lucide-react'
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

  const sidebarClassName = `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'} bg-white transition-all duration-500 overflow-hidden h-full shadow-md z-40`

  return (
    <div className={sidebarClassName}>
        {/* TOP LOGO */}
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <div>logo</div>
            <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-2xl`}>NBSTOCK</h1>
            <button className='md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toogleSidebar}>
            <Menu className='w-4 h-4' size={24}/>
        </button>
        </div>
        {/* LINKS */}
        <div className='flex-grow mt-8'>
          {/* {LINKS ....} */}
        </div>
        {/* FOOTER */}
        <div>
            <p className='text-center text-xs text-gray-500'>&copy; 2024 ntirushwa</p>
        </div>
    </div>
  )
}

export default SideBar