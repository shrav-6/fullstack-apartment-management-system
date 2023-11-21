import React from 'react';
import './Apps.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import { Route, Routes } from 'react-router-dom';
import { RoomProvider } from './context';
import SingleRoom from './pages/SingleRoom';
import ApplicationForm from '../PublicView/pages/ApplicationForm';
//import ProtectedRoute from '../public view/components/ProtectedRoute';
import Wishlist from '../PublicView/pages/WishList';

function App() {
  return (
    <>
  <RoomProvider>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/listing/:id" element={<SingleRoom />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      </RoomProvider>
    </>
  );
}

export default App;
