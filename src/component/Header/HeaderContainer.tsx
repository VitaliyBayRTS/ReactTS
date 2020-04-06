import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {setUserData} from './../../redux/authMeReducer';
import Axios from 'axios';

interface MyProps {
    setUserData: any
    isAuth: any
    login: any
}

class HeaderContainer extends React.Component<MyProps>{

    componentDidMount() {
        Axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then((response: any) => {
            let {id, login, email} = response.data.data;
            this.props.setUserData({id, login, email});
        })
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

export default connect(mapStateToProps, {setUserData})(HeaderContainer);