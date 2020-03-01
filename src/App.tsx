import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import Profile from './component/Profile/Profile';
import Dialog from './component/Dialog/Dialog';
import { Route, BrowserRouter } from 'react-router-dom';
import { DialogDataInterface, PostDataInterface } from '.';

interface PropsInterface {
  dialogDate: DialogDataInterface
  postData: Array<PostDataInterface>
}

const App: FunctionComponent<PropsInterface> = (props) => {
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <NavBar />
        <div className={s.content}>
            <Route path="/profile" render={() => <Profile postData={props.postData}/>} />
            <Route path="/dialog" render={() => <Dialog dialogData={props.dialogDate}/>} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
