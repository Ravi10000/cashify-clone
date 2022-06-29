import {put, all, call, takeLatest } from 'redux-saga/effects';
import SHOP_ACTION_TYPES from './shop.types';
import {
    fetchProductsSuccess,
    fetchProductsFailure
} from './shop.actions';

export function* fetchProductsAsync(){
    try{
        const res = yield fetch('/api/products');
        const resJson = yield res.json()
        yield put(fetchProductsSuccess(resJson))
    }catch(err){
        yield put(fetchProductsFailure(err))
    }
}

export function* fetchProductsStart(){
    yield takeLatest(
        SHOP_ACTION_TYPES.FETCH_PRODUCTS_START,
        fetchProductsAsync
    )
}

export default function* shopSagas(){
    yield all([
        call(fetchProductsStart)
    ])
}
