export type contactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

export type photosType = {
    small: string,
    large: string
}

export type profileInfoType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    aboutMe: string,
    contacts: contactsType,
    photos: photosType
}
export type usersType = {
    id: number,
    name: string,
    status: string,
    photos: photosType,
    followed: boolean
}

export type DialogItemDataType = {
    id: number,
    name: string
}

export type DialogMessageDataType = {
    id: number,
    text: string
}

export type dialogDataType = {
    DialogItemData: Array<DialogItemDataType>,
    DialogMessageData: Array<DialogMessageDataType>
}

export type postDataType = {
    id: number,
    text: string,
    like: number
}