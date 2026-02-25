"use client"


import {  StudentFullType } from "@/@types/@types"
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
import { useGetData } from "@/hooks/useAxios/axios"
import { LeaveModal } from "./leaveModal"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { AddToGroup } from "./add_grop"
import { useDeletestudents, useReturnFromVacation, useReturnStudent } from "@/hooks/useQuery/useQueryAction"

interface TableActionsProps {
    data: StudentFullType[]
    onSucess: () => void
  }
  
  


export const TableActions = ({ data, onSucess }: TableActionsProps) => {
  const [isOpenModal, setIsOpenModal] =useState<boolean>(false);
  const [userInfo, setUserInfo] =useState<StudentFullType | null>(null);
  const [groupModal, setGroupModal] =useState<boolean>(false)



  const router =useRouter()
  

  const [isLeaveModal, setIsLeaveModal] =useState<boolean>(false)
  const getData =useGetData()
  const {mutate:RetrunStudent} =useReturnStudent()

  const {mutate} =useDeletestudents()


const {mutate:RetrunFromVocation} =useReturnFromVacation()
  return (
<>
            <AddToGroup open={groupModal} setOpen={setGroupModal} onSucess={onSucess} userId={userInfo?._id as string} />
            <LeaveModal open={isLeaveModal} setOpen={setIsLeaveModal} onSucess={onSucess} userInfo={userInfo} />
<Table className="text-[1rem]">

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
    mutate(user?._id)
  }}
>
  O'chirish
</DropdownMenuItem>
<DropdownMenuItem 
onClick={() =>{
  setUserInfo(user)
  setGroupModal(true)
}}
>
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
        <DropdownMenuItem  onClick={() =>RetrunFromVocation(user?._id)}>
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
        <DropdownMenuItem  onClick={() =>RetrunStudent(user?._id)}>
          O'qishga qaytarish
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