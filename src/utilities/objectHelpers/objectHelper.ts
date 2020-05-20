export const unfollowFollowChanging = (items: any, itemId: any, actionId: any, newObject: {}) => {
    return items.map((u: any) => {
        if (u[itemId] === actionId) {
            return { ...u, ...newObject };
        }
        return u;
    })
}