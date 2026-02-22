// =====================
// COMMON TYPES
// =====================

export interface LeaveHistoryType {
  _id: string
  days: number
  reason: string
  start_date: string
  end_date: string
}

export interface PaymentType {
  _id: string
  amount: number
  date: string
  method?: string
}

// =====================
// USER
// =====================

export interface UserType {
  _id: string
  first_name: string
  last_name: string
  email: string
  image: string | null
  role: string
  status: string
  active: boolean
  is_deleted: boolean
  leave_history: LeaveHistoryType[]
  work_date: string
  work_end: string | null
  createdAt: string
  updatedAt: string
}

// =====================
// STUDENT
// =====================

export interface StudentBaseType {
  _id: string
  first_name: string
  last_name: string
  phone: string
  status: string
  is_deleted: boolean
  createdAt: string
  updatedAt: string
}

export interface StudentGroupShortType {
  _id: string
  name: string
  is_deleted: boolean
  teacher: string
  course: string
}

export interface StudentGroupType {
  _id: string
  group: StudentGroupShortType
  joinedAt: string
  exitedAt: string
  payments: PaymentType[]
  status: "chiqdi" | "faol"
}

export interface StudentFullType extends StudentBaseType {
  address?: string | null
  email?: string
  image?: string | null
  leave_history: LeaveHistoryType[]
  all_price_group: number
  groups: StudentGroupType[]
}

// =====================
// COURSE
// =====================

export interface CourseNameType {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CourseType {
  _id: string
  name: CourseNameType
  description: string
  duration: string
  is_freeze: boolean
  price: number
  createdAt: string
  updatedAt: string
  __v: number
}

// =====================
// TEACHER
// =====================

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
  groups: GroupType[]   // group id lar
  createdAt: string
  updatedAt: string
  work_date: string
  work_end: string | null
}

// =====================
// GROUP
// =====================

export interface GroupType {
  _id: string
  name: string
  price: number
  course: string
  teacher: TeacherType
  students: StudentBaseType[]
  disable: boolean
  is_deleted: boolean
  started_group: string
  end_group: string
  createdAt: string
  updatedAt: string
}

// =====================
// GROUP DETAILS (minimal)
// =====================

export interface GroupDetailsType {
  _id: string
  name: string
  course: string
  teacher: string
  price: number
  disable: boolean
  is_deleted: boolean
  started_group: string
  end_group: string
  createdAt: string
  updatedAt: string
}

// =====================
// DATE FORMAT FUNCTION
// =====================


// =====================
// COURSE RESPONSE ITEM
// =====================

export interface CourseResponseType {
  _id: string
  description: string
  duration: string
  is_freeze: boolean
  name: {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  price: number
  createdAt: string
  updatedAt: string
  __v: number
}




export function formatISOToSimpleTime(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}






export function formatISOToSimpleTimeHour(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second =date.getSeconds()

  return `${day}-${month}-${year}, ${hour}:${minute}:${second}`
}