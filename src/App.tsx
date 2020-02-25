import React from 'react';
import './App.scss';
import Header from './component/Header';
import NavBar from './component/NavBar';
import Profile from './component/Profile';


function App(): any {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <Profile />
    </div>
  );
}

export default App;
