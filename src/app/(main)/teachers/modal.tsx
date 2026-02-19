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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  course_id: string
  email: string
  phone: string
  password: string
}

export const AlertDialogDemo = ({ open, setOpen, onSucess }: ModalBoolean) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<CourseType[]>([])
  const [courseId, setCourseId] = useState<string>("")
  const getData = useGetData()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (formData: FormValues) => {
    const values = {
      ...formData,
      course_id: courseId, // tanlangan course_id
    }

    try {
      setLoading(true)
      const res = await getData("teacher/create-teacher", "POST", values)
      console.log(res)
      onSucess()

      if (res.status === 403) {
        toast.error("Xatolik yuz berdi")
      } else {
        toast.success("Teacher muvaffaqiyatli qo'shildi")
        reset()
        setOpen(false)
      }
    } catch (err) {
      console.log(err)
      toast.error("Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  const dispatch = useDispatch()
  const router = useRouter()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getData("course/get-courses?is_freeze=false", "GET", undefined)
      setData(res?.data)
      setLoading(false)
    } catch (err: any) {
      console.log(err)
      if (err.message === "Invalid token") {
        dispatch(setLogout())
        router.push("/login")
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new Teacher</AlertDialogTitle>
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

          <Label>Gruhni tanlang</Label>
          <Select onValueChange={(val) => setCourseId(val)} value={courseId}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data?.map((val: CourseType) => (
                  <SelectItem key={val._id} value={val._id}>
                    {val.name.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label>Telefon raqam</Label>
          <Input {...register("phone", { required: "please enter phone" })} placeholder="+998 99 123 45 67" />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <Label>Password</Label>
          <Input type="password" {...register("password", { required: "please enter password" })} placeholder="**********" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

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
