import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Home() {
  return (
    <>
      <div className="flex flex-col px-28">
        <div className="flex justify-end mt-2">
        <Link href="/add-contact">
          <div className="flex gap-5 items-center bg-gray-200 p-2 rounded-lg hover:bg-green-400 cursor-pointer">
            <p>add course</p>
            <IoIosAddCircleOutline />
          </div>
          </Link>
        </div>
        <div className="px-28 my-5">
          <h1>COURSES GOES HERE ⬇️</h1>
        </div>
      </div>
    </>
  );
}
