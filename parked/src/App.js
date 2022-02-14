import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, About, YourBenches, Whoops404 } from "./pages/pages"

function App() {
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/yourbenches" element={<YourBenches />}/>
          <Route path="*" element={<Whoops404 />}/>
      </Routes>
      </div>
    </Router>
      
    </>
  );
}

export default App;
