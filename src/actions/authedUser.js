export const SET_AUTHED_USER = 'SET_AUTHED_USER';

// this action will return the name of the authedUser

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}