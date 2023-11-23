import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../molecules/Navbar/Navbar';
import Notices from '../organisms/noticeboard/Notices/Notices';
import Home from '../pages/Home';
import Signup from '../organisms/Signup/Signup';
import Signin from '../organisms/Signin/Signin';
import Logout from '../organisms/Logout/Logout';
import Buildings from '../organisms/Managers/Buildings';
import Apps from '../organisms/PublicView/Apps';
import ViewListings from '../organisms/Managers/ViewListings';
import ListingsForm from '../organisms/Managers/addListings';
import UpdateListings from '../organisms/Managers/updateListings';
import ViewApplications from '../organisms/Managers/Applications';
import ViewTenant from '../organisms/tenant view/Tenant';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/*" exact element={<Apps />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/notices" exact element={<Notices />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/Dashboard" element={<Buildings />} />
          <Route path="/listings" element={<ViewListings />} />
          <Route path="/addListing" element={<ListingsForm />} />
          <Route path="/updateListing" element={<UpdateListings />} />
          <Route path="/applications" element={<ViewApplications />} />
          <Route path="/tenant" element={<ViewTenant />} />
        </Routes>
      </div>
    </>
  );
}

// ...

export default App;
