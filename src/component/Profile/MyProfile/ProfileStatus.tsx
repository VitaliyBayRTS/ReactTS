import React from 'react';
// import s from './MyProfile.module.scss';

interface PropsInterface {
    status: string
    updateUserStatusThunk: any
}

class ProfileStatus extends React.Component<PropsInterface> {
    
    state = {
        isEditMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if(this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    activeEditMode = () => {
        this.setState({
            isEditMode: true
        })
    }

    deactiveEditMode = () => {
        this.setState({
            isEditMode: false
        })
        this.props.updateUserStatusThunk(this.state.status)
    }

    onChangeStatus = (e: any) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <>
                {!this.state.isEditMode &&
                    <div>
                        <span onDoubleClick={this.activeEditMode}>{this.props.status || "-----"}</span>
                    </div>
                }
                {this.state.isEditMode &&
                    <div>
                        <input onChange={this.onChangeStatus} onBlur={this.deactiveEditMode} autoFocus 
                            type="text" value={this.state.status}/>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus;