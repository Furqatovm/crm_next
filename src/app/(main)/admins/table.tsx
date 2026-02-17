import { User } from "@/@types/@types"
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

interface TableActionsProps {
    data: User[]
    onSucess: () => void
  }
  
  


export const TableActions = ({ data, onSucess }: TableActionsProps) => {
  const [isOpenModal, setIsOpenModal] =useState<boolean>(false);
  const [userInfo, setUserInfo] =useState<User | null>(null);
  const getData =useGetData()

  console.log(userInfo)

  const fetchData = async (userId: string) => {
    try {
      const res = await getData("staff/deleted-admin", "DELETE", {_id: userId} );
      console.log(res)
      onSucess()
    } catch (err:any) {
      console.log(err.message);
    }
  };




  return (
    <Table className="text-[15px]">
            <AdminEditModal open={isOpenModal}  setOpen={setIsOpenModal} onSucess={onSucess}  userInfo ={userInfo}   />

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
              <DropdownMenuItem
  onClick={() => {
    setUserInfo(user)  
    setIsOpenModal(true) 
  }}
>
  Tahrirlash
</DropdownMenuItem>
                <DropdownMenuItem >O'chirish</DropdownMenuItem>
                <DropdownMenuItem onClick={() =>{
                    fetchData(user?._id)
                }}>
                 Ta'tilga chiqarish
                </DropdownMenuItem>
                <DropdownMenuItem>Info</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
})}
    </TableBody>
     }
    </Table>
  )
}