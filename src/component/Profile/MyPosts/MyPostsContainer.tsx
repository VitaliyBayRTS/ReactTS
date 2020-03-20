import { addPostActionCreator,  newPostTextActionCreator} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

// interface PropsInterface {
//     store: any
// }

// const MyPostsContainer: FunctionComponent<PropsInterface> = (props) => {
//     let addPost = () => {
//         props.store.dispatch(addPostActionCreator());

//     };

//     let onChangeAction = (text: string | undefined) => {
//         props.store.dispatch(newPostTextActionCreator(text));
//     }
    
//     return (
//         <MyPosts addPost={addPost} 
//                 newPostText={onChangeAction}
//                 postData={props.store.getState().profilePage.PostData}
//                 newPostTextValue={props.store.getState().profilePage.newPostText} />
//     )
// }
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

const SuperMyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default SuperMyPostsContainer;