import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import categorySlice from './categorySlice'
import sliderSlice from './sliderSlice'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import filterSlice from './filterSlice'
import checkoutSlice from './checkoutSlice'
import orderSlice from './orderSlice'

const store=configureStore({
    reducer:{
    auth:authSlice,
    category:categorySlice,
    slider:sliderSlice,
    product:productSlice,
    cart:cartSlice,
    filter:filterSlice,
    checkout:checkoutSlice,
    order:orderSlice
    }
})
export default store