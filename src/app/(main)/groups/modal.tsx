"use client"

import { CourseResponseType } from "@/@types/@types"
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
import { useAddGroup } from "@/hooks/useQuery/useQueryAction"
import { setLogout } from "@/store/auth-slice"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess: () => void
}

interface FormValues {
  started_group: string
}

interface SimpleTeacherType {
  id: string
  name: string
}

interface SimpleCourseType {
  id: string
  name: string
}

export const AlertDialogDemo = ({ open, setOpen, onSucess }: ModalBoolean) => {
  const [teachers, setTeachers] = useState<SimpleTeacherType[]>([])
  const [courses, setCourses] = useState<SimpleCourseType[]>([])
  const [teacherSearch, setTeacherSearch] = useState("")
  const [courseSearch, setCourseSearch] = useState("")

  const [selectedTeacher, setSelectedTeacher] = useState<SimpleTeacherType | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<SimpleCourseType | null>(null)

  const teacherDropdownRef = useRef<HTMLDivElement>(null)
  const courseDropdownRef = useRef<HTMLDivElement>(null)
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false)
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)

  const getData = useGetData()
  const dispatch = useDispatch()
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

  const { mutate, isPending } = useAddGroup()

  const fetchTeachers = async () => {
    try {
      const res = await getData("teacher/get-all-teachers", "GET")
      if (res?.data) {
        const mapped = res.data.map((t: any) => ({
          id: t._id,
          name: `${t.first_name} ${t.last_name}`
        }))
        setTeachers(mapped)
      }
    } catch (err: any) {
      if (err.message === "Invalid token") {
        dispatch(setLogout())
        router.push("/login")
      }
    }
  }

  const fetchCourses = async () => {
    try {
      const res = await getData("course/get-courses?is_freeze=false", "GET")
      if (res?.data) {
        const mapped = res.data.map((c: CourseResponseType) => ({
          id: c._id,
          name: c.name.name
        }))
        setCourses(mapped)
      }
    } catch (err: any) {
      if (err.message === "Invalid token") {
        dispatch(setLogout())
        router.push("/login")
      }
    }
  }

  useEffect(() => {
    if (open) {
      fetchTeachers()
      fetchCourses()
    }
  }, [open])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (teacherDropdownRef.current && !teacherDropdownRef.current.contains(e.target as Node)) {
        setShowTeacherDropdown(false)
      }
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(e.target as Node)) {
        setShowCourseDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const onSubmit = (data: FormValues) => {
    if (!selectedTeacher || !selectedCourse) {
      toast.error("Iltimos, teacher va course ni tanlang")
      return
    }

    const payload = {
      course_id: selectedCourse.id,
      teacher: selectedTeacher.id,
      started_group: data.started_group
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success("Guruh muvaffaqiyatli qo'shildi")
        reset()
        setSelectedTeacher(null)
        setSelectedCourse(null)
        setTeacherSearch("")
        setCourseSearch("")
        setOpen(false)
        onSucess()
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Xatolik yuz berdi")
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yangi guruh qo'shish</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          <div className="relative" ref={teacherDropdownRef}>
            <Label>Teacher</Label>
            <Input
              value={selectedTeacher ? selectedTeacher.name : teacherSearch}
              onChange={(e) => {
                setTeacherSearch(e.target.value)
                setSelectedTeacher(null)
                setShowTeacherDropdown(true)
              }}
              onFocus={() => setShowTeacherDropdown(true)}
              placeholder="Teacherni qidiring..."
              className="mt-2"
            />
            {showTeacherDropdown && !selectedTeacher && (
              <ul className="absolute bg-white border w-full mt-1 max-h-40 overflow-auto z-50 rounded shadow-md">
                {teachers
                  .filter(t => t.name.toLowerCase().includes(teacherSearch.toLowerCase()))
                  .map(t => (
                    <li
                      key={t.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedTeacher(t)
                        setShowTeacherDropdown(false)
                      }}
                    >
                      {t.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="relative" ref={courseDropdownRef}>
            <Label>Course</Label>
            <Input
              value={selectedCourse ? selectedCourse.name : courseSearch}
              onChange={(e) => {
                setCourseSearch(e.target.value)
                setSelectedCourse(null)
                setShowCourseDropdown(true)
              }}
              onFocus={() => setShowCourseDropdown(true)}
              placeholder="Course ni qidiring..."
              className="mt-2"
            />
            {showCourseDropdown && !selectedCourse && (
              <ul className="absolute bg-white border w-full mt-1 max-h-40 overflow-auto z-50 rounded shadow-md">
                {courses
                  .filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()))
                  .map(c => (
                    <li
                      key={c.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedCourse(c)
                        setShowCourseDropdown(false)
                      }}
                    >
                      {c.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div>
            <Label>Started Group</Label>
            <Input 
              type="date" 
              className="mt-2"
              {...register("started_group", { required: "Sana tanlash majburiy" })} 
            />
            {errors.started_group && <p className="text-red-500 text-xs mt-1">{errors.started_group.message}</p>}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>Bekor qilish</AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Yuborilmoqda..." : "Tasdiqlash"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}