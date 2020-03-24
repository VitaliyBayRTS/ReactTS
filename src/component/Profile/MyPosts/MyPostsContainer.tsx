import { addPostActionCreator,  newPostTextActionCreator} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state: any) => {
    return {
        postData: state.profilePage.PostData,
        newPostTextValue: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        newPostText: (text: string | undefined) => {
            dispatch(newPostTextActionCreator(text));
        }
    }
} 

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;