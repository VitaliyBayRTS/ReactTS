import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


let mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth
    }
} 

export const withSuspense = (Component: any) => {
    return (props: any) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </React.Suspense>
    }
}

