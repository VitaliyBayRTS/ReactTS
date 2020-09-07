import React, { FunctionComponent } from 'react';
import s from './App.module.scss';
import NavBar from './component/NavBar/NavBar';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';
import { UsersPage } from './component/Users/UsersPage';
import HeaderContainer from './component/Header/HeaderContainer';
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from 'react-redux';
import Preloader from './component/common/Preloader/Preloader';
import store, { stateType } from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
import cn from 'classnames';
import { Login } from './component/Login/Login';

const ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'));
const DialogContainer = React.lazy(() => import('./component/Dialog/DialogContainer'));

type mapStateToPropsType = {
  appInitialized: boolean
}
type mapDispatchToPropsType = {
  initializeApp: () => void
}


type PropsType = mapStateToPropsType & mapDispatchToPropsType

type LocalStateType = {
  isOpenMenu: boolean
}

class App extends React.Component<PropsType> {

  componentDidMount() {
    this.props.initializeApp();
  }

  state: LocalStateType = {
    isOpenMenu: false
}

  render() {
    if(!this.props.appInitialized) return <Preloader />

    return (
      <div className={s.container}>
        <button className={s.menu} onClick={() => this.setState({
          isOpenMenu: !this.state.isOpenMenu
        })}>☰</button>
        <div className={s.header}></div>
        <HashRouter> {// Instead of hashRouter I was used BrowserRouter, but BrowserRouter is working incorrect with 
                      // GitHub pages
                    }
          <div className={s.app_wrapper}>
            <HeaderContainer />
            <div className={cn(s.navBar, {
              [s.mobileNavBar]: this.state.isOpenMenu 
            })}>
              <NavBar/>
            </div>
            <div className={s.content}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/profile" />}/>
                <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                <Route path="/dialog" render={withSuspense(DialogContainer)}/>
                <Route path="/users" render={() => <UsersPage />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="*" render={() => <div>404 Page not Found</div>}/>
              </Switch>
            </div>
          </div>
      </HashRouter>
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
