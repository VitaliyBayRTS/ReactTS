import { usersType } from './../../types/types';
export const unfollowFollowChanging = (items: Array<usersType>, itemId: any, actionId: number, newObject: {}) => {
    return items.map((u: any) => {
        if (u[itemId] === actionId) {
            return { ...u, ...newObject };
        }
        return u;
    })
}