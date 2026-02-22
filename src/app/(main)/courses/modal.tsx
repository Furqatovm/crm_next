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

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess:() =>void
}

interface FormValues {
    name:string
}

export const AddCategoryModal = ({ open, setOpen, onSucess }: ModalBoolean) => {
  const [loading, setLoading] = useState<boolean>(false)
  const getData = useGetData()
  const role: string = "manager"

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
  
      const res = await getData(
        "course/create-category",
        "POST",
        data
      )
  
      if (res.status !== 201) {
        toast.error(res.message || "Xatolik yuz berdi")
        return
      }
  
      toast.success("Category muvaffaqiyatli qo'shildi")
      reset()
      setOpen(false)
      onSucess()
  
    } catch (err: any) {
      console.log(err)
      toast.error("Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kurs Yaratish</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">

          <Label>Lastname</Label>
          <Input {...register("name", { required: "Please enter topic name" })} placeholder="Rus tili" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}


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
