"use client"

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
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { setLogout } from "@/store/auth-slice"
import { UserType } from "@/@types/@types"
import { useSetLeaveAdmin } from "@/hooks/useQuery/useQueryAction"

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  userInfo: UserType | null
  onSucess: () => void
}

interface FormValues {
  start_date: string
  end_date: string
  reason: string
}

export const LeaveModal = ({
  open,
  setOpen,
  userInfo,
  onSucess,
}: ModalProps) => {
  const {mutate, isPending} =useSetLeaveAdmin()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    if (!userInfo?._id) {
      toast.error("User topilmadi")
      return
    }

    const payload = {
      _id: userInfo._id,
      start_date: data.start_date,
      end_date: data.end_date,
      reason: data.reason,
    }
    mutate(payload, {
      onSuccess:() =>{
        toast.success("Success");
        reset()
        
        setOpen(false);

      }
    })

  
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave Request</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label className="my-2">Boshlanish sanasi</Label>
            <Input
              type="date"
              {...register("start_date", {
                required: "Boshlanish sanasini kiriting",
              })}
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div>
            <Label className="my-2">Tugash sanasi</Label>
            <Input
              type="date"
              {...register("end_date", {
                required: "Tugash sanasini kiriting",
              })}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.end_date.message}
              </p>
            )}
          </div>

          <div>
            <Label className="my-2">Sababi</Label>
            <Input
              placeholder="Masalan: Shaxsiy sabab"
              {...register("reason", {
                required: "Sababni kiriting",
              })}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </AlertDialogCancel>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Yuborilmoqda..." : "Submit"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
