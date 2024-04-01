import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Europe from "./pages/Europe";
import Asia from "./pages/Asia";
import NorthAmerica from "./pages/NorthAmerica";
import SouthAmerica from "./pages/SouthAmerica";
import Africa from "./pages/Africa";
import Home from "./pages/Home";
import Countries from "./pages/Countries";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="countries" element={<Countries />} />
            <Route path="asia" element={<Asia />} />
            <Route path="africa" element={<Africa />} />
            <Route path="europe" element={<Europe />} />
            <Route path="northamerica" element={<NorthAmerica />} />
            <Route path="southamerica" element={<SouthAmerica />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
