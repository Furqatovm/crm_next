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

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  userInfo: User | null
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
  const [loading, setLoading] = useState(false)
  const getData = useGetData()
  const dispatch = useDispatch()
  const router = useRouter()

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


    try {
      setLoading(true)

      await getData(
        "staff/leave-staff",
        "POST",
        payload
      )

      toast.success("Leave muvaffaqiyatli yuborildi")
      onSucess()
      reset()
      setOpen(false)

    } catch (err: any) {
      console.error(err)
      toast.error("Xatolik yuz berdi")

      if (err?.message === "Invalid token") {
        dispatch(setLogout())
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
          <AlertDialogTitle>Leave Request</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label>Boshlanish sanasi</Label>
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
            <Label>Tugash sanasi</Label>
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
            <Label>Sababi</Label>
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

            <Button type="submit" disabled={loading}>
              {loading ? "Yuborilmoqda..." : "Submit"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
