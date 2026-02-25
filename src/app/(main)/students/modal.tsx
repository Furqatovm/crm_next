"use client"

import { GroupDetailsType } from "@/@types/@types"
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
import { useQueryHandler } from "@/hooks/useAxios/useFetchdata" // Guruhlarni olish uchun
import { useAddStudent } from "@/hooks/useQuery/useQueryAction"
import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

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

export const AlertDialogDemo = ({
  open,
  setOpen,
  onSucess,
}: ModalBoolean) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: groupsData } = useQueryHandler({
    url: "group/get-all-group", 
    pathname: "get-all-groups-for-student"
  })

  const courses: GroupDetailsType[] = groupsData?.data || []

  const { mutate, isPending } = useAddStudent()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleGroup = (id: string) => {
    setSelectedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  const filteredCourses = courses.filter((course) => {
    if (course.is_deleted) return false;
    const name = typeof course.name === "string" ? course.name : (course as any)?.name?.name || ""
    return name.toLowerCase().includes(search.toLowerCase())
  })

  const onSubmit = (formData: FormValues) => {
    if (selectedGroups.length === 0) {
      toast.error("Iltimos kamida bitta guruhni tanlang")
      return
    }

    const payload = {
      ...formData,
      groups: selectedGroups.map((id) => ({
        group: id,
      })),
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success("Student muvaffaqiyatli qo'shildi")
        reset()
        setSelectedGroups([])
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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Yangi Student qo'shish</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>Ism</Label>
            <Input {...register("first_name", { required: "Ismni kiriting" })} placeholder="Alisher" />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
          </div>

          <div>
            <Label>Familiya</Label>
            <Input {...register("last_name", { required: "Familiyani kiriting" })} placeholder="Yusupov" />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
          </div>

          <div>
            <Label>Telefon Raqam</Label>
            <Input {...register("phone", { required: "Telefonni kiriting" })} placeholder="+998 90 123 45 67" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="relative" ref={dropdownRef}>
            <Label>Guruhni tanlang</Label>
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Guruhni qidiring..."
              className="mt-2"
            />

            {showDropdown && (
              <div className="absolute z-50 mt-1 w-full max-h-48 overflow-auto rounded-md border bg-white shadow-lg">
                {filteredCourses.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground text-center">Guruh topilmadi</div>
                ) : (
                  filteredCourses.map((course) => {
                    const name = typeof course.name === "string" ? course.name : (course as any)?.name?.name
                    return (
                      <div
                        key={course._id}
                        onClick={() => {
                          toggleGroup(course._id)
                          setSearch("")
                          setShowDropdown(false)
                        }}
                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${selectedGroups.includes(course._id) ? "bg-blue-50" : ""}`}
                      >
                        {name}
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>

          {/* Tanlangan guruhlar */}
          {selectedGroups.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
              {selectedGroups.map((id) => {
                const course = courses.find((c) => c._id === id)
                const name = typeof course?.name === "string" ? course.name : (course as any)?.name?.name
                return (
                  <span key={id} className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded text-xs">
                    {name}
                    <button type="button" onClick={() => toggleGroup(id)} className="hover:text-red-300 ml-1">✕</button>
                  </span>
                )
              })}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Bekor qilish</AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Yuborilmoqda..." : "Qo'shish"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}