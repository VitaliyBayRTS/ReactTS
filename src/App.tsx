import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import Header from './component/Header/Header';
import NavBar from './component/NavBar/NavBar';
import Profile from './component/Profile/Profile';
import Dialog from './component/Dialog/Dialog';
import { Route, BrowserRouter } from 'react-router-dom';

interface PropsInterface {
  store: any
}

const App: FunctionComponent<PropsInterface> = (props) => {
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <NavBar />
        <div className={s.content}>
            <Route path="/profile" render={() => <Profile state={props.store.state.profilePage}
                                                          addPost={props.store.addPost}
                                                          changePostText={props.store.changePostText}/>} />
            <Route path="/dialog" render={() => <Dialog dialogData={props.store.state.dialogPage} 
                                                          addMessage={props.store.addMessage}
                                                          changeMessageText={props.store.changeMessageText}/>} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
