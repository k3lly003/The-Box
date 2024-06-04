'use client'

import { Menu } from 'lucide-react'
import React from 'react'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <div>
        {/* TOP LOGO */}
        <div className='flex gap-3 justify-between md:justify-normal items-center pt-8'>
            <div>logo</div>
            <h1 className='font-extrabold text-2xl'>NBSTOCK</h1>
            <button className='md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={()=>{}}>
            <Menu className='w-4 h-4' size={24}/>
        </button>
        </div>
        {/* LINKS */}
        <div>

        </div>
        {/* FOOTER */}
        <div>
            <p className='text-center text-xs text-gray-500'>&copy; 2024 ntirushwa</p>
        </div>
    </div>
  )
}

export default SideBar