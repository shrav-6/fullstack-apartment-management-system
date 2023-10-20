import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../molecules/Navbar';
import Notices from '../organisms/notices/Notices';
import Home from '../pages/Home';
import Signup from '../organisms/signup/Signup';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
