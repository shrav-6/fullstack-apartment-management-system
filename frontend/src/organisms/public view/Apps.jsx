import React from 'react';
import './Apps.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { RoomProvider } from './context';
import SingleRoom from './pages/SingleRoom';
import ApplicationForm from '../public view/pages/ApplicationForm';
//import ProtectedRoute from '../public view/components/ProtectedRoute';

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
        </Routes>
      </div>
      </RoomProvider>
    </>
  );
}

export default App;
