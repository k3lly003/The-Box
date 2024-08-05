import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[80vh] px-28">
        <h1 className="font-bold text-2xl">Mini Drive app</h1>
        <p className="p-5 text-lg text-green-600">Store photos, audio files contact and many more on this app!</p>
      </div>
    </>
  );
}
