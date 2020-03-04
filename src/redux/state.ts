// let rerenderEntireTree = (state: any) => {

// }



interface DialogMessageInterface {
    text: string
};
interface DialogItemInteface {
    id: number
    name: string
}

export interface DialogDataInterface {
    DialogItemData: Array<DialogItemInteface>
    DialogMessageData: Array<DialogMessageInterface>
    newMessageText: string
}


interface PostInterface {
    id: number
    text: string
    like: number
};
export interface PostDataInterface {
    PostData: Array<PostInterface>
    newPostText: string
}

let store = {
    state : {
        dialogPage : {
            DialogItemData : [
                { id: 1, name: "User 1" },
                { id: 2, name: "User 2" },
                { id: 3, name: "User 3" },
                { id: 4, name: "User 4" },
                { id: 5, name: "User 5" },
                { id: 6, name: "User 6" }
            ],
            DialogMessageData : [
                { text: "PrePrePre" },
                { text: "PrePrePrePrePrePrePrePrePre" },
                { text: "OMG, i am in YouTube" }
            ],
            newMessageText: ""
        },
        profilePage : {
            PostData : [
                { id: 1,  text: "Super puper ninja 1", like: 4 },
                { id: 2, text: "OMG I'm in Internet", like: 2 },
                { id: 3, text: "Join to my way of samurai", like: 13 }
            ], 
            newPostText: ""
        }
    },

    addPost(): void {
        let newPost = {
            id: 4,
            text: store.state.profilePage.newPostText,
            like: 0
        };
        store.state.profilePage.PostData.push(newPost);
        store.state.profilePage.newPostText = "";
        store.rerenderEntireTree(store.state);
    },

    addMessage(): void {
        let newMessage = {
            text: store.state.dialogPage.newMessageText
        }
        store.state.dialogPage.DialogMessageData.push(newMessage);
        store.state.dialogPage.newMessageText = "";
        store.rerenderEntireTree(store.state);
    },
    
    changeMessageText(text: string)  {
        store.state.dialogPage.newMessageText = text;
        store.rerenderEntireTree(store.state);
    },
    changePostText(text: string) {
        store.state.profilePage.newPostText = text;
        debugger;
        store.rerenderEntireTree(store.state);
    },

    subscriber(observer: any) {
        store.rerenderEntireTree = observer;
    },

    rerenderEntireTree(state: any) {

    }
}

// let state = {
//     dialogPage : {
//         DialogItemData : [
//             { id: 1, name: "User 1" },
//             { id: 2, name: "User 2" },
//             { id: 3, name: "User 3" },
//             { id: 4, name: "User 4" },
//             { id: 5, name: "User 5" },
//             { id: 6, name: "User 6" }
//         ],
//         DialogMessageData : [
//             { text: "PrePrePre" },
//             { text: "PrePrePrePrePrePrePrePrePre" },
//             { text: "OMG, i am in YouTube" }
//         ],
//         newMessageText: ""
//     },
//     profilePage : {
//         PostData : [
//             { id: 1,  text: "Super puper ninja 1", like: 4 },
//             { id: 2, text: "OMG I'm in Internet", like: 2 },
//             { id: 3, text: "Join to my way of samurai", like: 13 }
//         ], 
//         newPostText: ""
//     }
// }

// export const addPost = (): void => {
//     let newPost = {
//         id: 4,
//         text: state.profilePage.newPostText,
//         like: 0
//     };
//     state.profilePage.PostData.push(newPost);
//     state.profilePage.newPostText = "";
//     rerenderEntireTree(state);
// };

// export const addMessage = (): void => {
//     let newMessage = {
//         text: state.dialogPage.newMessageText
//     }
//     state.dialogPage.DialogMessageData.push(newMessage);
//     state.dialogPage.newMessageText = "";
//     rerenderEntireTree(state);
// }

// export const changeMessageText = (text: string) => {
//     state.dialogPage.newMessageText = text;
//     rerenderEntireTree(state);
// }
// export const changePostText = (text: string) => {
//     state.profilePage.newPostText = text;
//     debugger;
//     rerenderEntireTree(state);
// }

// export const subscriber = (observer: any) => {
//     rerenderEntireTree = observer;
// }


export default store;