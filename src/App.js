import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Feature,
  Navbar,
  Brand,
  Menu1,
  RainbowKit,
  Carousel,
} from "./components";
import { Header, Footer } from "./containers";
import "./App.css";
import { Home, Ipfs } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} default />
          <Route path="/chains/:title" element={<Ipfs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
