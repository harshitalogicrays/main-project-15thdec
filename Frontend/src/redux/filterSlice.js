import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filterProducts:[],searchvalue:'',categoryvalue:'',pricevalue:''},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            // console.log(action.payload)
            let {products,search}=action.payload
            let search1 = search.toLowerCase()
            if(search1 !=''){
               let pro= products.filter((item)=>item.category.toLowerCase().includes(search1) || item.name.toLowerCase().includes(search1))
               state.filterProducts=pro
               state.searchvalue=search1
            }
        },
        FILTER_BY_CATEGORY(state,action){
            let {products,category}=action.payload
            if(category !=''){
                let pro= products.filter((item)=>item.category ==category)
               state.filterProducts=pro
               state.categoryvalue=category 
            }
        },
        FILTER_BY_PRICE(state,action){}
    }
})

export const {FILTER_BY_SEARCH,FILTER_BY_CATEGORY,FILTER_BY_PRICE}=filterSlice.actions
export default filterSlice.reducer
export const selectFilterProducts=state=>state.filter.filterProducts
export const selectserach = state=>state.filter.searchvalue
export const selectcategory=state=>state.filter.categoryvalue
export const selectprice=state=>state.filter.pricevalue