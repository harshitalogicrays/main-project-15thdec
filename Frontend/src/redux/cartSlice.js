import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:'cart',
    initialState:{cartItems:[],totalAmount:0,previousURL:''},
    reducers:{
        ADD_TO_CART(state,action){
            // console.log(action.payload)
            const itemIndex=state.cartItems.findIndex(item=>item.id==action.payload.id)
            console.log(itemIndex)
            if(itemIndex == -1){//add
                state.cartItems=[...state.cartItems,{...action.payload,qty:1}]
                window.scrollTo(0,0)
                toast.success(`${action.payload.name} added to cart`)
            }
            else {//increase 
                if(state.cartItems[itemIndex].stock > action.payload.qty ){
                    state.cartItems[itemIndex].qty++
                    state.cartItems=[...state.cartItems]
                 }
            }
         
        },
        DECREASE(state,action){
            const itemIndex=state.cartItems.findIndex(item=>item.id==action.payload.id)
            if(action.payload.qty  > 1){
                state.cartItems[itemIndex].qty--
                state.cartItems=[...state.cartItems]
             }
        },
        REMOVE_CART_ITEM(state,action){
            let filterdata=state.cartItems.filter((item)=>item.id!=action.payload.id)
            state.cartItems=filterdata
        },
        EMPTY_CART(state,action){
            state.cartItems=[];state.totalAmount=0;
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        },
        CALCULATE_TOTAL(state,action){ 
            const t = state.cartItems.reduce((prev,cur)=>{return prev+(cur.price*cur.qty)},0)
            state.totalAmount = t
        }
    }
})

export const {ADD_TO_CART,DECREASE,REMOVE_CART_ITEM,EMPTY_CART,SAVE_URL,CALCULATE_TOTAL}=cartSlice.actions
export default cartSlice.reducer
export const selectCartItems=state=>state.cart.cartItems
export const selectTotalAmount=(state)=>state.cart.totalAmount
export const selectURL=state=>state.cart.previousURL