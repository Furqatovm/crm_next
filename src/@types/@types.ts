



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
  _id: string
  student_id: string
  leave_days: number
  reason: string
  createdAt: string
  updatedAt?: string
}

export interface StudentType2 {
  _id: string
  first_name: string
  last_name: string
  phone: string
  adress: string | null
  all_price_group: number
  status: string
  is_deleted: boolean
  groups: GroupType[]
  leave_history: LeaveHistoryType[]
  createdAt: string
  updatedAt: string
}



export function formatISOToSimpleTime(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()


  return `${day}-${month}-${year}`
}
