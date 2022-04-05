import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, About, Account, Multi, Whoops404 } from "./pages/pages"

function App() {
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Multi />}/>
          <Route path="/historical" element={<Account />}/>
          <Route path="*" element={<Whoops404 />}/>
      </Routes>
      </div>
    </Router>
      
    </>
  );
}

export default App;
