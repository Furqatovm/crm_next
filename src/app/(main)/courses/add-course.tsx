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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useGetData } from "@/hooks/useAxios/axios"
import { useAddNewCourse } from "@/hooks/useQuery/useQueryAction"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess:() =>void
}

interface FormValues {
    name:string
    description:string
    duration: string
    price:number
}



export const AddCourseModal = ({ open, setOpen, onSucess }: ModalBoolean) => {
  const [loading, setLoading] = useState<boolean>(false)
  const {mutate} =useAddNewCourse()

  const getData = useGetData()
  const role: string = "manager"

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    mutate(data, {
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
          <AlertDialogTitle>Add new Course</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">

          <Label className="col-span-full">Name</Label>
          <Input className="col-span-full" {...register("name", { required: "please enter lastname" })} placeholder="Frontend n101" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <Separator />
          <AlertDialogTitle className="col-span-full">Course Details</AlertDialogTitle>
          <Label className="col-span-full">Details</Label>
          <Textarea className="col-span-full" rows={10} {...register("description", { required: "please enter lastname" })} placeholder="something" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
       <div>
       <Label className="my-3">Duration</Label>
          <Input className="" {...register("duration", { required: "please enter duration" })} placeholder="1 yil" />
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
       </div>

         <div>
         <Label className="my-3">Pice (UZS)</Label>
          <Input  type="number" className=""{...register("price", { required: "please enter duration" })} defaultValue={0} />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
         </div>

          <AlertDialogFooter className="col-span-full">
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
