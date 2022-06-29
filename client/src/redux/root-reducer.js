import {combineReducers} from 'redux';
import ShopReducer from './shop/shop.reducer';
import UserReducer from './user/user.reducer';

const rootReducer = combineReducers({
    shop: ShopReducer,
    user: UserReducer,
})

export default rootReducer