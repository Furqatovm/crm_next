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
import { useChangeGroupTime } from "@/hooks/useQuery/useQueryAction"

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess: () => void
  userId:string
}

interface FormValues {
  date:string
}

export const LeaveModal = ({
  open,
  setOpen,
  onSucess,
  userId
}: ModalProps) => {
  const {mutate, isPending} =useChangeGroupTime()
  const [loading, setLoading] = useState(false)
  const getData = useGetData()
  const dispatch = useDispatch()
  const router = useRouter()
  console.log(userId)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {


    const payload = {
      _id:userId,
      date:data.date
    }
    mutate(payload)

    
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tuash sanasini belgilash</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >


          <div>
            <Label className="my-2">Tugash sanasi </Label>
            <Input type="date"
              {...register("date", {
                required: "Tugash sanasini kiriting",
              })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date.message}
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
