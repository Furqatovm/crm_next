"use client"


import {  formatISOToSimpleTimeHour, GroupDetailsType, GroupType } from "@/@types/@types"
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

interface TableActionsProps {
    data: GroupType[]
    onSucess: () => void
  }
  
  


export const TableActions = ({ data, onSucess }: TableActionsProps) => {
  const [userInfo, setUserInfo] =useState<GroupDetailsType | null>(null);
  const [groupModal, setGroupModal] =useState<boolean>(false)
  const [userId, setUserid] =useState<string>("")

  console.log(data)



  const router =useRouter()
  

  const [isLeaveModal, setIsLeaveModal] =useState<boolean>(false)
  const getData =useGetData()



  const EndGroup = async (userId: string) => {
    try {
      const res = await getData("group/end-group", "DELETE", {_id: userId} );
      console.log(res)
      toast.success("user ishga qaytarildi")
      onSucess()
    } catch (err:any) {
      console.log(err.message);
    }
  };








  return (
<>
            <AddToGroup open={groupModal} setOpen={setGroupModal} onSucess={onSucess} userId={userInfo?._id as string} />
            <LeaveModal open={isLeaveModal} setOpen={setIsLeaveModal} onSucess={onSucess} userId ={userId} />
<Table className="text-[1rem]">

      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Guruh Nomi</TableHead>
          <TableHead>Ustoz</TableHead>
          <TableHead  className="text-center">O'quvchilar soni</TableHead>
          <TableHead>Boshlangan vaqti</TableHead>
          <TableHead>Tugagan vaqti</TableHead>
          <TableHead className="text-end">Amallar</TableHead>
        </TableRow>
      </TableHeader>
     {
      <TableBody>
      {
        data?.length ==0  ? <TableRow>
  <TableCell colSpan={6} className="text-center">No data</TableCell>
</TableRow>

        :
        data.map((user, index) => {
          return   <TableRow key={user._id}>
               <TableCell>{index +1}</TableCell>
               <TableCell>{user.name}</TableCell>
               <TableCell>{`${user.teacher.first_name} ${user.teacher.last_name}`}</TableCell>
               <TableCell className="text-center">{user.students.length}</TableCell>
               <TableCell>
                {formatISOToSimpleTimeHour(user?.createdAt)}
               </TableCell>
               <TableCell>
                {
                  user.is_deleted ? 
                  formatISOToSimpleTimeHour(user?.end_group)
                  :
                  "Davom etmoqda"
                }
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
                      {!user.is_deleted && 
                                            <DropdownMenuItem onClick={() =>{
                                              EndGroup(user?._id)
                                            }}>
                                            Guruhni tugatish
                                          </DropdownMenuItem>
                                          }

                      <DropdownMenuItem onClick={() =>{
                        setIsLeaveModal(true);
                        setUserid(user?._id)
                      }}>
                        Guruh tugash vaqtini o'zgartirish
                      </DropdownMenuItem>
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