import {createSelector} from  'reselect'

const selectShop = state => state.shop;

export const selectProducts = createSelector(
    [selectShop],
    shop => shop.products
)