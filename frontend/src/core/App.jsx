import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../molecules/Navbar/Navbar';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import Notices from '../organisms/noticeboard/Notices/Notices';
import Services from '../pages/Services/Services';
import Help from '../pages/Help/Help';
import Signup from '../organisms/noticeboard/Signup/Signup';
import Signin from '../organisms/noticeboard/Signin/Signin';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
      
        <Routes>
          <Route path="/" exact element={<Signin />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/about-us" exact element={<AboutUs />} />
          <Route path="/notices" exact element={<Notices />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/services" exact element={<Services />} />
          <Route path="/help" exact element={<Help />} />
          <Route path="/signup" exact   element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />
        </Routes>
      
      </div>
    </>
  );
}

export default App;
