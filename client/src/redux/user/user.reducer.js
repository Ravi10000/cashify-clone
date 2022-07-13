import USER_ACTION_TYPES from "./user.types"
const INITIAL_STATE = {
    currentUser: null,
    err: null
}

const UserReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case USER_ACTION_TYPES.FETCH_USER_SUCCESS:
        case USER_ACTION_TYPES.UPDATE_USER_SUCCESS:
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case USER_ACTION_TYPES.SIGNOUT_USER_SUCCESS:
            return{
                ...state,
                currentUser: null
            }
        case USER_ACTION_TYPES.SIGNOUT_USER_FAILURE:
        case USER_ACTION_TYPES.FETCH_USER_FAILURE:
        case USER_ACTION_TYPES.UPDATE_USER_FAILURE:
            return{
                ...state,
                err: action.payload
            }

        default: return state
    }
}

export default UserReducer