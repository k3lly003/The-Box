import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="flex justify-center">
        <div class="bg-white w-full rounded max-w-xl">
          <h1 className=" text-xl flex justify-center font-bold">Sign Up</h1>
          <form class="rounded px-8 pt-6 pb-8 my-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="firstname"
              >
                first name
              </label>
              <input
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="first name"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="secondname"
              >
                second name
              </label>
              <input
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="secondName"
                type="text"
                placeholder="second name"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="email"
              >
                email
              </label>
              <input
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder=" your email"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="your password"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 w-full px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign Up
              </button>
            </div>
            <Link
              to="/login"
              className="block text-black w-6/12 hover:text-green-500 text-md font-bold my-5"
            >
              Already have an account ? <span>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
