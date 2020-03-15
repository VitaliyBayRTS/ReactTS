import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import sidebarReducer from "./sidebarReducer";

interface DialogMessageInterface {
    text: string
}

interface DialogItemInteface {
    id: number
    name: string
}

interface ActionType {
    type: string
    postText?: string
    messageText?: string
}

interface PostInterface {
    id: number
    text: string
    like: number
}

export interface DialogDataInterface {
    DialogItemData: Array<DialogItemInteface>
    DialogMessageData: Array<DialogMessageInterface>
    newMessageText: string
}

export interface PostDataInterface {
    PostData: Array<PostInterface>
    newPostText: string
}

let store = {
    _state: {
        dialogPage: {
            DialogItemData: [
                { id: 1, name: "User 1" },
                { id: 2, name: "User 2" },
                { id: 3, name: "User 3" },
                { id: 4, name: "User 4" },
                { id: 5, name: "User 5" },
                { id: 6, name: "User 6" }
            ],
            DialogMessageData: [
                { text: "PrePrePre" },
                { text: "PrePrePrePrePrePrePrePrePre" },
                { text: "OMG, i am in YouTube" }
            ],
            newMessageText: ""
        },
        profilePage: {
            PostData: [
                { id: 1, text: "Super puper ninja 1", like: 4 },
                { id: 2, text: "OMG I'm in Internet", like: 2 },
                { id: 3, text: "Join to my way of samurai", like: 13 }
            ],
            newPostText: ""
        },
        sidebarPage: {
            sidebarData: [
                {id: 1, text: "Hay que terminar React.ts"}
            ],
            newNoteText: ""
        }
    },
    getState() {
        return this._state;
    },

    subscribe(observer: any) {
        this.rerenderEntireTree = observer;
    },

    dispatch(action: ActionType) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);

        this.rerenderEntireTree(this._state);
    },

    rerenderEntireTree(state: any) {

    }
}

export default store;