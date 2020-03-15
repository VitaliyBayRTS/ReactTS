import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import Profile from './component/Profile/Profile';
import Dialog from './component/Dialog/Dialog';
import { Route, BrowserRouter } from 'react-router-dom';

interface PropsInterface {
  store: any
  dispatch: any
}

const App: FunctionComponent<PropsInterface> = (props) => {
  // debugger;
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <NavBar state={props.store.sidebarPage} dispatch={props.dispatch}/>
        <div className={s.content}>
            <Route path="/profile" render={() => <Profile state={props.store.profilePage}
                                                          dispatch={props.dispatch}/>} />
            <Route path="/dialog" render={() => <Dialog dialogData={props.store.dialogPage} 
                                                          dispatch={props.dispatch}/>} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
