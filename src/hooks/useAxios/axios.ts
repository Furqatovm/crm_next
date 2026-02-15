// types.ts
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
    leave_history: any[]; // agar leave_historyda obyektlar bo‘lsa, alohida interface qilishingiz mumkin
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
  
  


  // api.ts
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
