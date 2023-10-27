import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../molecules/Navbar';
import Notices from '../organisms/noticeboard/Notices/Notices';
import Home from '../pages/Home';
import Signup from '../organisms/noticeboard/Signup/Signup';
import Signin from '../organisms/noticeboard/Signin/Signin';
//import Logout from '../organisms/noticeboard/logout/logout';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
      
        <Routes>
          <Route path="/" exact element={<Signin />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/notices" exact element={<Notices />} />
          <Route path="/signup" exact   element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />
          {/* <Route path="/logout" exact element={<Logout />} /> */}
        </Routes>
      
      </div>
    </>
  );
}

// ...


export default App;
