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
import { Checkbox } from "@/components/ui/checkbox"
import { useGetData } from "@/hooks/useAxios/axios"
import { setLogout } from "@/store/auth-slice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess: () => void
}

interface FormValues {
  first_name: string
  last_name: string
  phone: string
}

export const AlertDialogDemo = ({ open, setOpen, onSucess }: ModalBoolean) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CourseType[]>([])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]) 
  const getData = useGetData()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

  const dispatch = useDispatch()
  const router = useRouter()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getData("course/get-courses?is_freeze=false", "GET")
      if (res?.data && Array.isArray(res.data)) {
        setData(res.data.filter((course: CourseType) => course._id))
      } else {
        setData([])
      }
    } catch (err: any) {
      if (err.message === "Invalid token") {
        dispatch(setLogout())
        router.push("/login")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleGroup = (id: string) => {
    setSelectedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const onSubmit = async (formData: FormValues) => {
    if (selectedGroups.length === 0) {
      toast.error("Iltimos kamida bitta kursni tanlang")
      return
    }

    const values = {
      ...formData,
      groups: selectedGroups.map(id => ({ group: id })),
    }

    console.log("Submitting values:", values)

    try {
      setLoading(true)
      const res = await getData("student/create-student", "POST", values)
      if (res.status === 403) {
        toast.error("Xatolik yuz berdi")
      } else {
        toast.success("Student muvaffaqiyatli qo'shildi")
        reset()
        setSelectedGroups([])
        setOpen(false)
        onSucess()
      }
    } catch (err: any) {
      console.log("Submission error:", err)
      toast.error("Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new Student</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          <Label>Firstname</Label>
          <Input {...register("first_name", { required: "please enter firstname" })} placeholder="Alisher" />
          {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

          <Label>Lastname</Label>
          <Input {...register("last_name", { required: "please enter lastname" })} placeholder="Yusupov" />
          {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

          <Label>Telefon Raqam</Label>
          <Input {...register("phone", { required: "please enter phone" })} placeholder="+998 77 044 46 46" />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <Label>Gruhni tanlang</Label>
          <div className="flex flex-col gap-2">
            {data.map(course => (
              <div key={course._id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedGroups.includes(course._id)}
                  onCheckedChange={() => toggleGroup(course._id)}
                  className="accent-blue-500"
                />
                <span>{course.name.name}</span>
              </div>
            ))}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}