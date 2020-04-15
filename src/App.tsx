import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import NavBar from './component/NavBar/NavBar';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogContainer from './component/Dialog/DialogContainer';
import UserContainer from './component/Users/UsersContainer';
import ProfileContainer from './component/Profile/ProfileContainer';
import HeaderContainer from './component/Header/HeaderContainer';
import Login from './component/Login/Login';

interface PropsInterface {
  store: any
}

const App: FunctionComponent<PropsInterface> = (props) => {
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <HeaderContainer />
        <NavBar store={props.store}/>
        <div className={s.content}>
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/dialog" render={() => <DialogContainer />} />
            <Route path="/users" render={() => <UserContainer />} />
            <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
