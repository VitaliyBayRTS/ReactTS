import Axios from 'axios';


let instance = Axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "767f330b-ea1f-4316-94ad-051b6e7ad9dd"
    },
})

export const usersAPI = {
    getUsers(currentPage: any, pageSize: any) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then( response => {
            return response.data;
        })
    },
    unfollow(userId: any) {
        return instance.delete(`follow/${userId}`).then( response => {
            return response.data;
        })
    },
    follow(userId: any) {
        return instance.post(`follow/${userId}`).then((response) => {
            return response.data;
        })
    },
    getProfile(userId: any) {
        console.warn("Obsolete method. Please use profileAPI.")
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: any) {
        return instance.get(`profile/${userId}`)
    },
    getUserStatus(userId: any) {
        return instance.get(`profile/status/${userId}`)
    },
    updateUserStatus(status: any) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfileInfo(profile: any) {
        return instance.put(`profile`, profile)
    }
}


export const authApi = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: any = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityApi = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`);
    }
}