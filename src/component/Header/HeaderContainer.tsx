import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {setUserData, meThunk} from './../../redux/authMeReducer';

interface MyProps {
    isAuth: any
    login: any
    meThunk: any
}

class HeaderContainer extends React.Component<MyProps>{

    componentDidMount() {
        this.props.meThunk();
    }


    render() {
        return <Header {...this.props}/>
    }
    
}

let mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {meThunk})(HeaderContainer);