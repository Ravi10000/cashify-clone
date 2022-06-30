import {put, all, call, takeLatest } from 'redux-saga/effects';
import USER_ACTION_TYPES from './user.types';
import axios from 'axios';
import {
    fetchUserSuccess,
    fetchUserFailure,
    signOutUserSuccess,
    signOutUserFailure,
    updateUserSuccess,
    fetchUserStart,
    updateUserFailure
} from './user.actions'

export function* fetchUserAsync(){
    try{
        const res = yield fetch('/api/user');
        const resJson = yield res.json()
        yield console.log('user: ', resJson)
        yield put(fetchUserSuccess(resJson))
    }catch(err){
        yield put(fetchUserFailure(err))
    }
}
export function* fetchUser(){
    yield takeLatest(
        USER_ACTION_TYPES.FETCH_USER_START,
        fetchUserAsync
    )
}

export function* signOutUserAsync(){
    try {
        yield axios.post('/api/user/signout')
        yield put(signOutUserSuccess())
    } catch (error) {
        yield put(signOutUserFailure())
    }
}


export function* signOutUser(){
    yield takeLatest(
        USER_ACTION_TYPES.SIGNOUT_USER_START,
        signOutUserAsync
    )
}

export function* updateUserAsync({payload}){
 try {
    yield axios.put('/api/user', payload)
    yield put(fetchUserStart())
 }
 catch (err) {
    yield put(updateUserFailure(err))
 }
}
export function* updateUser(){
    yield takeLatest(
        USER_ACTION_TYPES.UPDATE_USER_START,
        updateUserAsync
    )
}

export default function* userSagas(){
    yield all([
        call(fetchUser),
        call(signOutUser),
        call(updateUser)
    ])
}