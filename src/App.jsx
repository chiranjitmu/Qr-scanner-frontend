import React from "react";
import Qr from "./Components/Qr";
import History from "./Components/History";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/home" element={<Qr />} />
       <Route path="/history" element={<History />} />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
