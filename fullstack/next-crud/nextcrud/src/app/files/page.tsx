import React from 'react'
import Link from "next/link";
import { IoAdd, IoSearchOutline } from "react-icons/io5";

const page = () => {
  return (
    <>
          <div className="flex flex-col px-28 mt-10">
        <div className="flex justify-between items-center  max-w-[93%]">
          <h1 className="text-2xl font-bold">Files</h1>
          <Link href="/add-contact">
            <div className="flex gap-5 items-center bg-gray-200 p-2 rounded-full hover:bg-green-400 cursor-pointer">
              <IoAdd />
            </div>
          </Link>
        </div>
        <div className="mt-5">
          <div className="bg-gray-100 flex justify-center items-center w-[30%] h-[35px] rounded-2xl">
           <IoSearchOutline className="text-2xl w-[10%]"/>
           <input type="text" className="bg-gray-100 w-[90%] h-[35px] rounded-2xl"/>
          </div>
        </div>
        <div className="my-5  max-w-[93%]">
          <h1>FILES GOES HERE ⬇️</h1>
        </div>
      </div>
    </>
  )
}

export default page