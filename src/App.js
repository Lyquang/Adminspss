import React from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@mui/material/styles';

import './App.css';
import Header from './Components/Page/Header';
import SideBar from './Components/Page/SideBar';
import Footer from './Components/Page/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />
      <SideBar />
      <main className="main-content">
        {/* Child components will be rendered here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
  
}

export default App;
