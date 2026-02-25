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
import { InfoModal } from "./infoModal"
import { UserType } from "@/@types/@types"
import { EditeAdmins } from "./editeAdmins"
import { useDeleteAdmin, useReturnWorkStaff } from "@/hooks/useQuery/useQueryAction"

interface TableActionsProps {
    data: UserType[]
    onSucess: () => void
  }
  
  


export const TableActions = ({ data, onSucess }: TableActionsProps) => {
  const [isOpenModal, setIsOpenModal] =useState<boolean>(false);
  const [userInfo, setUserInfo] =useState<UserType | null>(null);
  const [infoModal, setInfoModal] =useState<boolean>(false);
  const [editeAdminModal, setEditedAdminModal] =useState<boolean>(false);

  

  const [isLeaveModal, setIsLeaveModal] =useState<boolean>(false)
  const getData =useGetData()

  console.log(userInfo?.status)
  const {mutate} =useDeleteAdmin()

const {mutate:ReturnMutate} =useReturnWorkStaff();



  return (
<>
            <LeaveModal open={isLeaveModal} setOpen={setIsLeaveModal} onSucess={onSucess} userInfo={userInfo} />
            <InfoModal open={infoModal} setOpen={setInfoModal} userInfo={userInfo} />
            <EditeAdmins open={editeAdminModal}  setOpen={setEditedAdminModal} onSucess={onSucess} userInfo={userInfo}/>
<Table className="text-[1rem]">

      <TableHeader>
        <TableRow>
          <TableHead>Ism</TableHead>
          <TableHead>Familya</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Holat</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
     {
      <TableBody>
      {
        data?.length ==0  ?<TableRow><TableCell>No data </TableCell></TableRow>
        :
        data.map((user) => {
          return   <TableRow key={user._id}>
               <TableCell>{user.first_name}</TableCell>
               <TableCell>{user.last_name}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>{user.role}</TableCell>
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
       {user?.status === "ishdan bo'shatilgan" ? (
         <>
           <DropdownMenuItem  onClick={() =>ReturnMutate(user?._id)}>
             Ishga qaytarish
           </DropdownMenuItem>
           <DropdownMenuItem
            onClick={() =>{
              setInfoModal(true)
              setUserInfo(user)
            }}
           >Info</DropdownMenuItem>
            </>
       ) : (
         <>
           <DropdownMenuItem
             onClick={() => {
               setUserInfo(user);
               setEditedAdminModal(true)
             }}
           >
             Tahrirlash
           </DropdownMenuItem>
           <DropdownMenuItem
            onClick={() =>mutate(user?._id)}
           >
             O'chirish
           </DropdownMenuItem>
           <DropdownMenuItem
             onClick={() => {
               setIsLeaveModal(true);
               setUserInfo(user);
             }}
           >
             Ta'tilda chiqarish
           </DropdownMenuItem>
           <DropdownMenuItem
            onClick={() =>{
              setInfoModal(true)
              setUserInfo(user)
            }}
           >Info</DropdownMenuItem>
         </>
       )}
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