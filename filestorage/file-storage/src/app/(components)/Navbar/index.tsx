'use client'
import React, { useState } from 'react'
import { Menu, Bell, Sun, Settings, Search } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import CustomSheet from '../shad_/CustomSheet'
import ModeToggle from "@/components/mode-toggle";

const Navbar = () => {
  const dispatch = useAppDispatch();
  
  //INITIATE STATE HERE ⬇️
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  
  // MANIPULATE STATE HERE ⬇️
  const toogleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // DISPLAY THE CUSTOMSHEET
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };



  return (
    <div className='flex justify-between items-center w-full mb-7'>
        {/* LEFT SIDE */}
        <div className='flex justify-between items-center gap-5'>
            <button className='px-3 py-3 bg-gray-200 rounded-full hover:bg-blue-100' onClick={toogleSidebar}>
                <Menu className='w-4 h-4'/>
            </button>
        </div>
        <div className='flex w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500'>
            <input type="search" placeholder='type to search ...' className='px-4 w-full py-2 dark:bg-gray-300' />
            <div className='relative insert-y-0 left-0 px-3 flex items-center pointer-events-non w-12 dark:bg-gray-300'>
              <Search className='text-gray-500 dark:bg-gray-300' size={20} />
            </div>
        </div>
        {/* RIGHT SIDE */}
        <div className='flex justify-between items-center gap-5'>
          <div className='hidden md:flex justify-between items-center gap-5'>
            <div>
             <ModeToggle />
            </div>
            <div className='relative'>
              <Bell className='cursor-pointer text-gray-500' size={24}/>
              <span className='absolute top-2 right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full'>3</span>
            </div>
            <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3'/>
            <div className='flex items-center gap-3 cursor-pointer' onClick={handleOpenSheet} >
              <div className='w-9 h-9 p-5 bg-blue-100 rounded-full'></div>
              {isSheetOpen && <CustomSheet open={<span className='font-semibold'>Brice Ntiru</span>}/>}
            </div>
          </div>
          <Link href='/settings'>
           <Settings className='cursor-pointer text-gray-500' size={24}/>
          </Link>
        </div>
    </div>
  )
}

export default Navbar