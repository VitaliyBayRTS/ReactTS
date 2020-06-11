import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import NavBar from './component/NavBar/NavBar';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import UserContainer from './component/Users/UsersContainer';
import HeaderContainer from './component/Header/HeaderContainer';
import LoginContainer from './component/Login/LoginContainer';
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from 'react-redux';
import Preloader from './component/common/Preloader/Preloader';
import store, { stateType } from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'));
const DialogContainer = React.lazy(() => import('./component/Dialog/DialogContainer'));

type mapStateToPropsType = {
  appInitialized: boolean
}
type mapDispatchToPropsType = {
  initializeApp: () => void
}


type PropsType = mapStateToPropsType & mapDispatchToPropsType

class App extends React.Component<PropsType> {

  componentDidMount() {
    this.props.initializeApp();
  }


  render() {
    if(!this.props.appInitialized) return <Preloader />

    return (
      <div className={s.container}>
        <div className={s.header}></div>
        <BrowserRouter>
          <div className={s.app_wrapper}>
            <HeaderContainer />
            <NavBar/>
            <div className={s.content}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/profile" />}/>
                <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                <Route path="/dialog" render={withSuspense(DialogContainer)}/>
                <Route path="/users" render={() => <UserContainer />} />
                <Route path="/login" render={() => <LoginContainer />} />
                <Route path="*" render={() => <div>404 Page not Found</div>}/>
              </Switch>
            </div>
          </div>
      </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state: stateType): mapStateToPropsType => {
  return {
    appInitialized: state.app.initialazed
  }
}

let AppContainer =  connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>
(mapStateToProps, {initializeApp})(App);

type SocialApp = {}

let SocialApp: FunctionComponent<SocialApp> = (props) => {
  return <Provider store={store}>
    <AppContainer />
  </Provider>
}

export default SocialApp;
