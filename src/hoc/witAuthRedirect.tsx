import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { stateType } from "../redux/redux-store";


type mapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: stateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
} 

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if(!this.props.isAuth) return <Redirect to="/login"/> // If user doesnt authorized, 
                                                                //program redirect him to login page
            return <Component {...this.props} />
        }
    }

    let connectAuthRedirectComponent = connect<mapStateToPropsType, {}, {}, stateType>
    (mapStateToProps, {})(RedirectComponent)

    return connectAuthRedirectComponent
}

