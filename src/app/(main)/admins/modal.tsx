"use client"

import { UserType } from "@/@types/@types"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetData } from "@/hooks/useAxios/axios"
import { useAddNewAdmin } from "@/hooks/useQuery/useQueryAction"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess:() =>void
}

interface FormValues {
  first_name: string
  last_name: string
  email: string
  password: string
  work_date: string
  role: string
  status: string
  active: boolean
  is_deleted: boolean
}

export const AlertDialogDemo = ({ open, setOpen, onSucess }: ModalBoolean) => {
  const getData = useGetData()
  const role: string = "manager"
  const {mutate, isPending} =useAddNewAdmin()

  const queryClient =useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<FormValues, "role" | "status" | "active" | "is_deleted">>()

  const onSubmit = async (data: Omit<FormValues, "role" | "status" | "active" | "is_deleted">) => {
    const values = { ...data, role };
  
    mutate(values, {
      onSuccess: (res: any) => {
        toast.success(res?.message || "Admin qo'shildi");
        setOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new Manager</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          <Label>Firstname</Label>
          <Input {...register("first_name", { required: "please enter firstname" })} placeholder="Davron" />
          {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

          <Label>Lastname</Label>
          <Input {...register("last_name", { required: "please enter lastname" })} placeholder="Raimjonov" />
          {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

          <Label>Email</Label>
          <Input {...register("email", { required: "please enter email" })} placeholder="example@gmail.com" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <Label>Password</Label>
          <Input type="password" {...register("password", { required: "please enter password" })} placeholder="******" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <Label>Ish boshlagan kuni</Label>
          <Input type="date" {...register("work_date", { required: "please enter date" })} />
          {errors.work_date && <p className="text-red-500">{errors.work_date.message}</p>}

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
