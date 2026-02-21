



export interface User {
  _id: string
  first_name: string
  last_name: string
  email: string
  image: string | null
  role: string
  status: string
  active: boolean
  is_deleted: boolean
  leave_history: any[]
  work_date: string
  work_end: string | null
  createdAt: string
  updatedAt: string
}
 


export interface StudentType {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  image: string | null
  status: string
  is_deleted: boolean
  createdAt: string
  updatedAt: string
}
 


export interface GroupType {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  students: StudentType[]
}





export interface CourseType {
  _id: string
  name: {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  description: string
  duration: string
  is_freeze: boolean
  price: number
  createdAt: string
  updatedAt: string
  __v: number
}




export interface TeacherType {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
  field: string
  image: string | null
  status: string
  is_deleted: boolean
  salary: number
  groups: GroupType[]
  createdAt: string
  updatedAt: string
  work_date: string
  work_end: string | null
}


export interface StudentTypes {
  _id: string
  first_name: string
  last_name: string
  phone: string
  address: string | null
  status: string
  is_deleted: boolean
  leave_history: any[]
  all_price_group: number
  groups: {
    _id: string
    name?: string 
  }[]
  createdAt: string
  updatedAt: string
}






export interface GroupTypee {
  _id: string
  name: string
  price: number
  status: string
  createdAt?: string
  updatedAt?: string
}

export interface LeaveHistoryType {
  days:number
  end_date:string
  reason:string
  start_date:string
  _id:string
}



export interface GroupDetailsType {
  _id: string;
  name: string;
  course: string;
  teacher: string;
  price: number;
  disable: boolean;
  is_deleted: boolean;
  started_group: string; 
  end_group: string;     
  createdAt: string;     
  updatedAt: string;     
}


export interface PaymentType  {
  _id: string;
  amount: number;
  date: string;
  method?: string;
};

export interface GroupChildrenType  {
  _id: string;
  name: string;
  teacher: string;
  course: string;
  is_deleted: boolean;
};

export interface StudentGroupType  {
  group: GroupChildrenType;
  joinedAt: string;
  exitedAt: string;
  payments: PaymentType[];
  status: "chiqdi" | "faol"; 
  _id: string;
};





export interface PaymentType {
  _id: string;
  amount: number;
  date: string;
  method?: string; // ixtiyoriy maydon
}

export interface GroupChildrenType {
  _id: string;
  name: string;
  teacher: string;
  course: string;
  is_deleted: boolean;
  // boshqa maydonlar bo'lsa qo'shishingiz mumkin
}

export interface StudentGroupType {
  _id: string;
  group: GroupChildrenType;
  joinedAt: string;    // Guruhga qo'shilgan sana (ISO string)
  exitedAt: string;    // Guruhdan chiqqan sana (ISO string)
  payments: PaymentType[];  // To'lovlar
  status: "chiqdi" | "faol"; // Holat
}


export interface StudentType2 {
  _id: string
  first_name: string
  last_name: string
  phone: string
  adress?: string | null
  all_price_group: number
  status: string
  is_deleted: boolean
  groups: StudentGroupType[]
  leave_history: LeaveHistoryType[]
  createdAt: string
  updatedAt: string
}


export type OqituvChiType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  field: string;
  groups: string[];
  image: string | null;
  is_deleted: boolean;
  password: string;
  phone: string;
  salary: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  work_date: string;
  work_end: string;
};

export type GruxlarType = {
  _id: string;
  name: string;
  price: number;
  course: string;
  field?: string;
  students: any[]; // agar student tipini alohida yaratmoqchi bo'lsangiz, uni ham o'zgartirish mumkin
  teacher: TeacherType;
  disable: boolean;
  is_deleted: boolean;
  started_group: string;
  end_group: string;
  createdAt: string;
  updatedAt: string;
};
export function formatISOToSimpleTime(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()


  return `${day}-${month}-${year}`
}
