import { createSlice } from "@reduxjs/toolkit";

let initial={isLoggedIn:false,userName:null,userEmail:null,userId:null,userRole:null}
const authSlice=createSlice({
    name:"auth",
    initialState:{...initial},
    reducers:{
        LOGIN_USER(state,action){
          let {name,email,role,id}=action.payload
            state.isLoggedIn=true 
            state.userEmail=email
            state.userName=name
            state.userRole=role
            state.userId=id
        },
        LOGOUT_USER(state,action){
            state.isLoggedIn=false 
            state.userEmail=null
            state.userName=null
            state.userRole=null
            state.userId=null
        }
    }
})
export const {LOGIN_USER,LOGOUT_USER}=authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn=(state)=>state.auth.isLoggedIn
export const selectUserEmail=(state)=>state.auth.userEmail
export const selectUserName=(state)=>state.auth.userName
export const selectUserRole=(state)=>state.auth.userRole
export const selectUserId=(state)=>state.auth.userId