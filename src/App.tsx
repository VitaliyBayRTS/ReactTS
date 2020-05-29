import React from 'react';
import s from './App.module.scss';
import NavBar from './component/NavBar/NavBar';
import { Route, BrowserRouter } from 'react-router-dom';
import UserContainer from './component/Users/UsersContainer';
import HeaderContainer from './component/Header/HeaderContainer';
import LoginContainer from './component/Login/LoginContainer';
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from 'react-redux';
import Preloader from './component/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'));
const DialogContainer = React.lazy(() => import('./component/Dialog/DialogContainer'));

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
              <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
              <Route path="/dialog" render={withSuspense(DialogContainer)}/>
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

let AppContainer =  connect(mapStateToProps, {initializeApp})(App);

let SocialApp: any = (props: any) => {
  return <Provider store={store}>
    <AppContainer store={store} />
  </Provider>
}

export default SocialApp;
