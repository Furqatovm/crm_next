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
import { useQueryHandler } from "@/hooks/useAxios/useFetchdata" // Ma'lumotni olish uchun
import { useAddNewGroup } from "@/hooks/useQuery/useQueryAction" // Mutatsiya uchun
import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ModalBoolean {
  open: boolean
  setOpen: (value: boolean) => void
  onSucess: () => void
  userId: string
}

interface FormValues {
  joinedAt: string
}

export const AddToGroup = ({ open, setOpen, onSucess, userId }: ModalBoolean) => {
  const [search, setSearch] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

  // 1. Guruhlar ro'yxatini API'dan yuklab olish
  const { data: groupsData } = useQueryHandler({
    url: "group/get-all-group",
    pathname: "get-all-groups-for-adding"
  })
  const courses: GroupType[] = groupsData?.data || []

  // 2. Guruhga qo'shish mutatsiyasi
  const { mutate, isPending } = useAddNewGroup()

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

  const onSubmit = (data: FormValues) => {
    if (!selectedGroup) {
      toast.error("Iltimos guruhni tanlang")
      return
    }

    const payload = {
      student_id: userId,
      group_id: selectedGroup._id,
      joinedAt: data.joinedAt,
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success("Student muvaffaqiyatli guruhga qo'shildi")
        reset()
        setSelectedGroup(null)
        setSearch("")
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
          <AlertDialogTitle>Guruhga qo'shish</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Qo'shilgan sana</Label>
            <Input
              {...register("joinedAt", { required: "Iltimos sana tanlang" })}
              type="date"
              className="mt-2"
            />
            {errors.joinedAt && <p className="text-red-500 text-xs mt-1">{errors.joinedAt.message}</p>}
          </div>

          <div className="relative" ref={dropdownRef}>
            <Label>Guruhni tanlang</Label>
            <Input
              value={selectedGroup ? (typeof selectedGroup.name === "string" ? selectedGroup.name : (selectedGroup as any)?.name?.name) : search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedGroup(null)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Guruhni qidiring..."
              className="mt-2"
            />

            {showDropdown && (
              <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => {
                    const name = typeof course.name === "string" ? course.name : (course as any)?.name?.name
                    return (
                      <div
                        key={course._id}
                        onClick={() => {
                          setSelectedGroup(course)
                          setSearch("")
                          setShowDropdown(false)
                        }}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {name}
                      </div>
                    )
                  })
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground bg-white text-center">
                    Guruh topilmadi
                  </div>
                )}
              </div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>
              Bekor qilish
            </AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Yuborilmoqda..." : "Tasdiqlash"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}