import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import { Route, BrowserRouter } from 'react-router-dom';
import SuperDialogContainer from './component/Dialog/DialogContainer';
import UserContainer from './component/Users/UsersContainer';
import ProfileContainer from './component/Profile/ProfileContainer';

interface PropsInterface {
  store: any
}

const App: FunctionComponent<PropsInterface> = (props) => {
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <NavBar store={props.store}/>
        <div className={s.content}>
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/dialog" render={() => <SuperDialogContainer />} />
            <Route path="/users" render={() => <UserContainer />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
