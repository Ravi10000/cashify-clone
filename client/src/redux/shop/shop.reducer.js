import SHOP_ACTION_TYPES from "./shop.types";

const INITIAL_STATE = {
    products : []
};

const ShopReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case SHOP_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        default: return state
    }
}

export default ShopReducer