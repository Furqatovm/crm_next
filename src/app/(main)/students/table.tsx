"use client"


import { StudentTypes, User } from "@/@types/@types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import {  useState } from "react"
import { AdminEditModal } from "./editModal"
import { useGetData } from "@/hooks/useAxios/axios"
import { LeaveModal } from "./leaveModal"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface TableActionsProps {
    data: StudentTypes[]
    onSucess: () => void
  }
  
  


export const TableActions = ({ data, onSucess }: TableActionsProps) => {
  const [isOpenModal, setIsOpenModal] =useState<boolean>(false);
  const [userInfo, setUserInfo] =useState<StudentTypes | null>(null);
  const [infoModal, setInfoModal] =useState<boolean>(false);


  const router =useRouter()
  

  const [isLeaveModal, setIsLeaveModal] =useState<boolean>(false)
  const getData =useGetData()

  console.log(userInfo?.status)

  const fetchData = async (userId: string) => {
    try {
      const res = await getData("student/delete-student", "DELETE", {_id: userId} );
      console.log(res)
      onSucess()
    } catch (err:any) {
      console.log(err.message);
    }
  };

  const ReturnWorkStaff = async (userId: string) => {
    try {
      const res = await getData("student/return-student", "POST", {_id: userId} );
      console.log(res)
      toast.success("user ishga qaytarildi")
      onSucess()
    } catch (err:any) {
      console.log(err.message);
    }
  };



  const ReturnStudentsFromVacation = async (userId: string) => {
    try {
      const res = await getData("student/return-leave-student", "POST", {student_id: userId} );
      console.log(res)
      toast.success("user ishga qaytarildi")
      onSucess()
    } catch (err:any) {
      console.log(err.message);
    }
  };





  return (
<>
            <AdminEditModal open={isOpenModal}  setOpen={setIsOpenModal} onSucess={onSucess}  userInfo ={userInfo}   />
            <LeaveModal open={isLeaveModal} setOpen={setIsLeaveModal} onSucess={onSucess} userInfo={userInfo} />
<Table className="text-[15px]">

      <TableHeader>
        <TableRow>
          <TableHead>Ism</TableHead>
          <TableHead>Familya</TableHead>
          <TableHead>Telefon Raqam</TableHead>
          <TableHead className="text-center">Guruhlar Soni</TableHead>
          <TableHead>Holat</TableHead>
          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
     {
      <TableBody>
      {
        data?.length ==0  ? <TableRow>
  <TableCell colSpan={6} className="text-center">No data</TableCell>
</TableRow>

        :
        data.map((user) => {
          return   <TableRow key={user._id}>
               <TableCell>{user.first_name}</TableCell>
               <TableCell>{user.last_name}</TableCell>
               <TableCell>{user.phone}</TableCell>
               <TableCell className="text-center">{user.groups.length}</TableCell>
               <TableCell>
                   {user.status}
               </TableCell>
               <TableCell className="text-right">
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="size-8">
                       <MoreHorizontalIcon />
                       <span className="sr-only">Open menu</span>
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent align="end">
       {user?.status === "faol" ? (

<>
         
<DropdownMenuItem
  onClick={() => {
    fetchData(user._id);
  }}
>
  O'chirish
</DropdownMenuItem>
<DropdownMenuItem>
  Guruhga qo'shish
</DropdownMenuItem>

<DropdownMenuItem
  onClick={() => {
    setIsLeaveModal(true);
    setUserInfo(user);
  }}
>
  Ta'tilga chiqarish
</DropdownMenuItem>
<DropdownMenuItem
onClick={() =>router.push(`students/${user?._id}`)}
>Info</DropdownMenuItem>
</>
       
       ) : user?.status ==="ta'tilda" ? 
       (
        <>
        <DropdownMenuItem  onClick={() =>ReturnStudentsFromVacation(user?._id)}>
          Tatildan Qaytarish
        </DropdownMenuItem>
        <DropdownMenuItem
        onClick={() =>router.push(`students/${user?._id}`)}
        >Info</DropdownMenuItem>
         </>
       )
       :
       (
        <>
        <DropdownMenuItem  onClick={() =>ReturnWorkStaff(user?._id)}>
          Ishga qaytarish
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() =>router.push(`students/${user?._id}`)}>Info</DropdownMenuItem>
         </>
       )
       
       }
     </DropdownMenuContent>
     
                 </DropdownMenu>
               </TableCell>
             </TableRow>
     })

      }
    </TableBody>
     }
    </Table>
</>
   
  )
}