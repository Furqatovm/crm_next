export type User = {
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
  };
  

  export interface CourseType {
    _id: string;
    name: {
      _id: string;
      name: string;
      createdAt: string; 
      updatedAt: string; 
      __v: number;
    };
    description: string;
    duration: string;
    is_freeze: boolean;
    price: number;
    createdAt: string; 
    updatedAt: string; 
    __v: number;
  }
  
  


  export  function formatISOToSimpleTime(isoString :string) {
    const date = new Date(isoString);
  
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month 0–11
    const year = date.getUTCFullYear();
  
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }