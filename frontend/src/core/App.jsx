import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../molecules/Navbar/Navbar';
import Notices from '../organisms/noticeboard/Notices/Notices';
import Home from '../pages/Home';
import Signup from '../organisms/noticeboard/Signup/Signup';
import Signin from '../organisms/noticeboard/Signin/Signin';
import Logout from '../organisms/noticeboard/logout/Logout';
import Buildings from '../organisms/noticeboard/Managers/DashBoard';
import NoticesM from '../organisms/noticeboard/Managers/NoticesM';
import ViewListings from '../organisms/noticeboard/Managers/ViewListings';
import ListingsForm from '../organisms/noticeboard/Managers/addListings';
import UpdateListings from '../organisms/noticeboard/Managers/updateListings';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Signin />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/notices" exact element={<Notices />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/Dashboard" element={<Buildings />} />
          <Route path="/listings" element={<ViewListings />} />
          <Route path="/noticesm" element={<NoticesM />} />
          <Route path="/addListing" element={<ListingsForm />} />
          <Route path="/updateListing" element={<UpdateListings />} />
        </Routes>
      </div>
    </>
  );
}

// ...


export default App;
