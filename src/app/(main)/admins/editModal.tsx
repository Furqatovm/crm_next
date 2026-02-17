"use client"

import { User } from "@/@types/@types"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetData } from "@/hooks/useAxios/axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { setLogout } from "@/store/auth-slice"




interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  userInfo:User | null,
  onSucess:() =>void
}

interface FormValues {
    _id:string
  first_name: string
  last_name: string
  email: string
  status:string
}

export const AdminEditModal = ({ open, setOpen, userInfo, onSucess }: ModalBoolean) => {
    const [status, setStatus] =useState<string>(`${userInfo?.status}`)
  const [loading, setLoading] = useState<boolean>(false)
  const getData = useGetData()
  const additionalInformations ={
    _id:userInfo?._id,
    status:status
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<FormValues,  "status">>()

  const dispatch =useDispatch();
  const router =useRouter();

  const onSubmit = async (data: Omit<FormValues, "status">) => {
    const values = {
      ...data,
      ...additionalInformations
     
    }

    
    try {
      setLoading(true)
      const res = await getData("staff/edited-admin", "POST", values)
      console.log(res)
      onSucess()
      if (res.status === 403) {
        toast.error("Xatolik yuz berdi ")
      } else {
        toast.success("Manager muvaffaqiyatli qo'shildi")
        reset()
        setOpen(false)
      }
    } catch (err:any) {
      console.log(err)
      toast.error("Xatolik yuz berdi")
      if(err.message ==="Invalid token"){
            dispatch(setLogout());
            router.push("/login")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit admin</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          <Label>Firstname</Label>
          <Input defaultValue={userInfo?.first_name}  {...register("first_name", { required: "please enter firstname" })} placeholder="Davron" />
          {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

          <Label>Lastname</Label>
          <Input defaultValue={userInfo?.last_name} {...register("last_name", { required: "please enter lastname" })} placeholder="Raimjonov" />
          {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

          <Select defaultValue={status}  onValueChange={(e) =>setStatus(e)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="faol">Faol</SelectItem>
          <SelectItem value="ta'tilda">Ishdan bo'shatilgan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

          <Label>Email</Label>
          <Input defaultValue={userInfo?.email} {...register("email", { required: "please enter email" })} placeholder="example@gmail.com" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}


          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
