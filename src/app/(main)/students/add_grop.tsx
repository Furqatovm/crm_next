"use client"

import { GroupType } from "@/@types/@types"
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
  userId: string
}

interface FormValues {
  group_id: string
  joinedAt: string
}

export const AddToGroup = ({ open, setOpen, onSucess, userId }: ModalBoolean) => {
  const [courses, setCourses] = useState<GroupType[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null) // ✅ GroupType bilan
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getData = useGetData()
  const dispatch = useDispatch()
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

  // Fetch groups
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await getData("group/get-all-group", "GET")
      setCourses(Array.isArray(res?.data) ? res.data : [])
    } catch (err: any) {
      if (err.message === "Invalid token") {
        dispatch(setLogout())
        router.push("/login")
      }
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) fetchCourses()
  }, [open])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCourses = courses.filter((val: GroupType) => {
    if (val.is_deleted) return false
    const name = typeof val.name === "string" ? val.name : (val as any)?.name?.name || ""
    return name.toLowerCase().includes(search.toLowerCase())
  })

  const onSubmit = async (data: FormValues) => {
    if (!selectedGroup) {
      toast.error("Iltimos guruhni tanlang")
      return
    }

    const payload = {
      student_id: userId,
      group_id: selectedGroup._id,
      joinedAt: data.joinedAt || new Date().toISOString(),
    }

    try {
      setLoading(true)
      await getData("student/added-new-group-student", "POST", payload)
      toast.success("Student muvaffaqiyatli guruhga qo'shildi")
      reset()
      setSelectedGroup(null)
      setSearch("")
      setOpen(false)
      onSucess()
    } catch {
      toast.error("Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Guruhga qo'shish</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Qo'shilgan sana</Label>
            <input
              {...register("joinedAt", { required: true })}
              type="date"
              className="my-2 border rounded px-2 py-1 w-full"
            />
            {errors.joinedAt && <p className="text-red-500 text-sm">Iltimos sana kiriting</p>}
          </div>

          <div className="relative" ref={dropdownRef}>
            <Label>Guruhni tanlang</Label>
            <Input
              value={
                search ||
                (selectedGroup ? (typeof selectedGroup.name === "string" ? selectedGroup.name : (selectedGroup as any)?.name?.name) : "")
              }
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedGroup(null)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Guruhni qidiring..."
              className="mt-2"
            />

            {showDropdown && filteredCourses.length > 0 && (
              <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
                {filteredCourses.map((course) => {
                  const name = typeof course.name === "string" ? course.name : (course as any)?.name?.name
                  return (
                    <div
                      key={course._id}
                      onClick={() => {
                        setSelectedGroup(course) // ✅ xato yo‘q
                        setSearch("")
                        setShowDropdown(false)
                      }}
                      className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      {name}
                    </div>
                  )
                })}
              </div>
            )}

            {showDropdown && filteredCourses.length === 0 && (
              <div className="absolute z-50 mt-1 w-full px-3 py-2 text-sm text-muted-foreground border rounded-md bg-white">
                Guruh topilmadi
              </div>
            )}
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