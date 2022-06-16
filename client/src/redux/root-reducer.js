import {combineReducers} from 'redux';
import ShopReducer from './shop/shop.reducer';

const rootReducer = combineReducers({
    shop: ShopReducer,
})

export default rootReducer