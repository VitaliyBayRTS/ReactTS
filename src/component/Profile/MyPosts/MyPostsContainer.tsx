import { addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { stateType } from '../../../redux/redux-store';
import { postDataType } from '../../../types/types';


type mapStateToPropsType = {
    postData: Array<postDataType>
}

type mapDispatchToPropsType = {
    addPost: (value: string) => void
}

let mapStateToProps = (state: stateType): mapStateToPropsType => {
    return {
        postData: state.profilePage.PostData
    }
}
let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        addPost: (value: string) => {
            dispatch(addPostActionCreator(value));
        }
    }
} 

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>
(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;