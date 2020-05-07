import { addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state: any) => {
    return {
        postData: state.profilePage.PostData
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (value: string) => {
            dispatch(addPostActionCreator(value));
        }
    }
} 

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;