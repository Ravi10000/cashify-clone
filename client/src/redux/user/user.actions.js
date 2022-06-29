import USER_ACTION_TYPES from "./user.types";

export const fetchUserStart = ()=>({
    type: USER_ACTION_TYPES.FETCH_USER_START
})

export const fetchUserSuccess = user=>({
    type: USER_ACTION_TYPES.FETCH_USER_SUCCESS,
    payload: user
})

export const fetchUserFailure = (err)=>({
    type: USER_ACTION_TYPES.FETCH_USER_FAILURE,
    payload: err
})

export const signOutUserStart = (res)=>({
    type: USER_ACTION_TYPES.SIGNOUT_USER_START,
})

export const signOutUserSuccess = (res)=>({
    type: USER_ACTION_TYPES.SIGNOUT_USER_SUCCESS,
})

export const signOutUserFailure = (err)=>({
    type: USER_ACTION_TYPES.SIGNOUT_USER_FAILURE,
})