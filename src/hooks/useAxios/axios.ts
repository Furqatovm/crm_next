"use client"


import Cookies from "js-cookie";

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface UserData {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    role: string;
    status: string;
    active: boolean;
    is_deleted: boolean;
    leave_history: any[]; 
    work_date: string;
    work_end: string | null;
    createdAt: string;
    updatedAt: string;
    token: string;
  }
  
  export interface LoginResponse {
    status: number;
    message: string;
    data: UserData;
  }
  
  


import axios from "axios";


export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => { 
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    return data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Login xatoligi";
    console.error("Login xatoligi:", message);
    throw new Error(message);
  }
};



export const useGetData =() =>{
  const token =Cookies.get("token");
  const request = async (
    url:string,
    method:"POST" | "GET" | "PUT" |"DELETE",
    body?:any,
    param?:object
  ) =>{
    try {
      const data =await axios({
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
        method,
        data:body,
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        params:{
       ...param
        }
      });

      return data.data
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  }

  return request
}






