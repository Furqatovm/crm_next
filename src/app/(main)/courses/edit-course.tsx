"use client"

import { CourseType } from "@/@types/@types"
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
import { useEditCourse } from "@/hooks/useQuery/useQueryAction"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess:() =>void
  courseInfo: CourseType | null
}

interface FormValues {
    duration:string
    price:number
}

export const EditedCourseModal = ({ open, setOpen, onSucess, courseInfo }: ModalBoolean) => {
  const {mutate, isPending} =useEditCourse()
  const [loading, setLoading] = useState<boolean>(false)
  const getData = useGetData()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } =useForm<FormValues>({
    values: {
      duration: courseInfo?.duration || "",
      price: courseInfo?.price || 0,
    }
  })
  

  const onSubmit = async (data: FormValues) => {
    const payload ={
        ...data,
        course_id:courseInfo?._id
    }
    mutate(payload, {
      onSuccess:() =>{
        reset();
        setOpen(false)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kurs Yaratish</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">

          <Label>Duration</Label>
          <Input defaultValue={courseInfo?.duration} {...register("duration", { required: "Please enter topic name" })} placeholder="1 yil" />
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}

          <Label>Narx (UZS)</Label>
          <Input defaultValue={courseInfo?.price} {...register("price", { required: "Please price" })}  type="number" placeholder="10000" />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

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
