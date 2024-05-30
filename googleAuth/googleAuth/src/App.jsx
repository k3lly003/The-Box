import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

const App = () => {
  return (
    <>
      <div>
        <Router>
          <header className="flex justify-between w-100 mx-5 my-5">
            <h3 className="text-xl text-white">GoogleAuth</h3>
            <span className="flex justify-end gap-5">
              <Link to="/home" className="text-xl text-white">
                Home
              </Link>
              <Link
                to="/"
                className="inline-block text-xl px-4 py-2 leading-none rounded bg-green-500 text-white hover:border-transparent hover:text-green-500 hover:bg-white mt-4 lg:mt-0"
              >
                Login
              </Link>
            </span>
          </header>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
