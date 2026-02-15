import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  role: string;
  status: string;
  active: boolean;
  is_deleted: boolean;
  leave_history: any[];  // agar leave_history objectlarni o'z ichiga olsa, alohida interface qilishingiz mumkin
  work_date: string;
  work_end: string | null;
  createdAt: string;
  updatedAt: string;
}
  
  interface InitialStateType {
    user: User | null;
    token: string | null;
  }
  
  const initialState: InitialStateType = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null, 
    token: Cookies.get("token") || null,
  };
  
const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state, { payload }: { payload: User }) => {
            state.user = payload;
            Cookies.set("user", JSON.stringify(payload) as string) 
          },          
        setToken:(state, {payload}) =>{
            state.token =payload;
            Cookies.set("token", payload); 
        },
        setLogout:(state) =>{
            state.token =null;
            state.user =null;
            Cookies.remove("user");
            Cookies.remove("token");
        }
    }
})


export const {setUser, setToken, setLogout} =authSlice.actions

export default authSlice.reducer