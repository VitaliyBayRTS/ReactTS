import React from 'react';
import s from './App.module.scss';
import NavBar from './component/NavBar/NavBar';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogContainer from './component/Dialog/DialogContainer';
import UserContainer from './component/Users/UsersContainer';
import ProfileContainer from './component/Profile/ProfileContainer';
import HeaderContainer from './component/Header/HeaderContainer';
import LoginContainer from './component/Login/LoginContainer';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import Preloader from './component/common/Preloader/Preloader';

interface PropsInterface {
  store: any
  initializeApp: any
  appInitialized: boolean
}

class App extends React.Component<PropsInterface> {

  componentDidMount() {
    this.props.initializeApp();
  }


  render() {
    if(!this.props.appInitialized) return <Preloader />

    return (
      <BrowserRouter>
        <div className={s.app_wrapper}>
          <HeaderContainer />
          <NavBar store={this.props.store}/>
          <div className={s.content}>
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialog" render={() => <DialogContainer />} />
              <Route path="/users" render={() => <UserContainer />} />
              <Route path="/login" render={() => <LoginContainer />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state: any) => {
  return {
    appInitialized: state.app.initialazed
  }
}

export default connect(mapStateToProps, {initializeApp})(App);
