

interface DialogMessageInterface {
    text: string
};

export interface DialogDataInterface {
    DialogItemData: Array<DialogItemInteface>
    DialogMessageData: Array<DialogMessageInterface>
}


export interface PostDataInterface {
    id: number
    text: string
    name: string
    like: number
};
interface DialogItemInteface {
    id: number
    name: string
}

let state = {
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
        ]
    },
    profilePage : {
        PostData : [
            { id: 1,  text: "Super puper ninja 1", name: "Ninja 1", like: 4 },
            { id: 2, text: "OMG I'm in Internet", name: "Ninja 2", like: 2 },
            { id: 3, text: "Join to my way of samurai", name: "Ninja 3", like: 13 }
        ]
    }
}

export let addPost = (postText: string): void => {
    let newPost = {
        id: 4,
        text: postText,
        name: "Ninja 4",
        like: 0
    };

    state.profilePage.PostData.push(newPost);
};

export let addMessage = (messageText: string): void => {
    let newMessage = {
        text: messageText
    }

    state.dialogPage.DialogMessageData.push(newMessage);
}


export default state;