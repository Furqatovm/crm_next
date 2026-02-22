import { formatISOToSimpleTime, UserType } from "@/@types/@types"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"
  

  interface ModalBoolean {
    open: boolean
    userInfo:UserType | null,
    setOpen: (value: boolean) => void
  }


  export const  InfoModal =({open, setOpen, userInfo} :ModalBoolean) => {
    const createdTime =formatISOToSimpleTime(userInfo?.createdAt as string)
    const updatedTime =formatISOToSimpleTime(userInfo?.updatedAt as string)
    return (
      <AlertDialog open={open} onOpenChange={setOpen} >
        <AlertDialogTrigger /> 
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogCancel className="absolute right-2 top-2">
            <X />
        </AlertDialogCancel>
        </AlertDialogHeader>
            <div className="flex  flex-col gap-6">
            <div className="flex gap-5 items-center">
                <div>
                <Avatar className="w-25 h-25">
        {userInfo?.image ? (
          <AvatarImage
            className="border border-primary"
            src={userInfo.image}
            alt={`${userInfo.first_name} ${userInfo.last_name}`}
          />
        ) : (
          <AvatarFallback>
            <span className="text-[1.5rem] font-semibold">{`${userInfo?.first_name?.[0] || ""}${userInfo?.last_name?.[0] || ""}`}</span>
          </AvatarFallback>
        )}
      </Avatar>
                </div>
                <div>
                    <h2 className="text-[1.5rem] font-semibold">{`${userInfo?.first_name}`}</h2>
                    <h2 className="text-[1.5rem] font-semibold"> {userInfo ?.last_name}</h2>
                    <span className="text-gray-600">{userInfo?.email}</span>
                </div>
            </div>
            <div className="flex gap-4">
                <span className="p-1 bg-red-400 text-white px-2 rounded-4xl text-[14px]">Role:{userInfo?.role}</span>
                <span className="p-1 bg-green-400 px-2 rounded-4xl text-[14px]">Status:{userInfo?.status}</span>
            </div>

            <div >
            <span className="text-gray-600 block">Qo'shilgan sanasi:   {createdTime}</span>
            <span className="text-gray-600 block mt-2">Yangilangan sanasi:   {updatedTime}</span>
            </div>
            </div>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  