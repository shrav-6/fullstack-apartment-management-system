import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../molecules/Navbar/Navbar';
import Home from '../pages/Home';
<<<<<<< Updated upstream
import AboutUs from '../pages/AboutUs/AboutUs';
import Notices from '../organisms/noticeboard/Notices/Notices';
=======
import Services from '../pages/Services/Services';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <Route path="/signup" exact element={<Signup />} />
=======
          <Route path="/services" exact element={<Services />} />
          <Route path="/signup" exact   element={<Signup />} />
>>>>>>> Stashed changes
          <Route path="/signin" exact element={<Signin />} />
        </Routes>
      
      </div>
    </>
  );
}

// ...


export default App;
