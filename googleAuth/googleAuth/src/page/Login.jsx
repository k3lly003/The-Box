import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex justify-center">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 w-full max-w-xl">
          <h1 className=" text-xl flex justify-center font-bold">Login</h1>
          <form class="px-8 pt-6 pb-8 my-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
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
                placeholder="password"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 w-full px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-5 w-1/2 ml-8">
            <h1 className="inline-block align-baseline font-bold text-xl text-blue-500">
              Login with
            </h1>
            <div className="flex gap-5 mt-5">
              <Link>Google</Link>
              <Link>Facebook</Link>
              <Link>Gmail</Link>
            </div>
          </div>
          <Link
            to="/signup"
            className="block text-black ml-8 w-7/12 hover:text-green-500 text-md font-bold my-5"
          >
            Don't have an account yet ? <span>SignUp</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
