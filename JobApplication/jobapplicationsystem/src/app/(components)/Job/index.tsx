import React from "react";

const index = () => {
  return (
    <>
      <div className="flex gap-10 border w-[35rem] rounded-lg px-3 py-5">
        <div>
          <h1 className="font-bold">Senior Frontend Developer</h1>
          <p className="font-thin">SheCanCode</p>
          <div className="flex gap-3">
            <p className="font-semibold">remote</p>
            <p className="text-green-500 font-medium">$200 - $500</p>
          </div>
        </div>
        <div>
          <ul className="flex gap-2">
            <li className="border flex justify-center rounded-lg px-2 font-medium">React js</li>
            <li className="border flex justify-center rounded-lg px-2 font-medium">Tailwindcss</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default index;
