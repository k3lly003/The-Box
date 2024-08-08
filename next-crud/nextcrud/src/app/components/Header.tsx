// import React from "react";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <div className="flex items-center gap-5 px-28">
      <div className="w-[20%] ">
      <Link href="/">
        <div className="flex gap-5 items-center my-5">
          <CgSmartHomeRefrigerator className="text-[20px] font-bold"/>
          <p className="text-[20px] font-bold">Drive</p>
        </div>
      </Link>
      </div>
      <div className="w-[20%]  flex justify-between items-center">
      <Link href="/contacts">
         <h1 className="hover:text-green-600">Contacts</h1>
        </Link>
        <Link href="/files">
          <h1 className="hover:text-green-600">Files</h1>
        </Link>
      </div>
      <div className=" w-[50%] flex justify-end items-end">
      <Link href="/auth" className="flex justify-center items-center gap-3">
         <MdOutlineAccountCircle className="text-2xl text-green-600"/>
         <h1 className="hover:text-white hover:bg-green-600 rounded p-2">Login</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
