



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




export function formatISOToSimpleTime(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}
