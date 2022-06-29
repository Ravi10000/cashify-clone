import USER_ACTION_TYPES from "./user.types"
const INITIAL_STATE = {
    currentUser: null
}

const UserReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case USER_ACTION_TYPES.FETCH_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case USER_ACTION_TYPES.SIGNOUT_USER_SUCCESS:
            return{
                ...state,
                currentUser: null
            }
        default: return state
    }
}

export default UserReducer