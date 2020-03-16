import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import Profile from './component/Profile/Profile';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogContainer from './component/Dialog/DialogContainer';

interface PropsInterface {
  store: any
}

const App: FunctionComponent<PropsInterface> = (props) => {

  // let state = props.store.getState().profilePage;
  // debugger;
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <NavBar store={props.store}/>
        <div className={s.content}>
            <Route path="/profile" render={() => <Profile store={props.store}/>} />
            <Route path="/dialog" render={() => <DialogContainer store={props.store}/>} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
