import React, { FunctionComponent } from 'react';
import './App.scss';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import Profile from './component/Profile/Profile';

interface PropsInterface {

}

const App: FunctionComponent<PropsInterface> = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <Profile />
    </div>
  );
}

export default App;
