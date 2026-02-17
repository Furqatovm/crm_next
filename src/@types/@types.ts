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
  

  