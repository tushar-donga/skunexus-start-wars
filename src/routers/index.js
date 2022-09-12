import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../components/App/App";
import DetailsComponent from "../components/Details/Details";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="details" element={<DetailsComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
