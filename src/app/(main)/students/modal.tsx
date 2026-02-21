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
  first_name: string
  last_name: string
  phone: string
}

export const AlertDialogDemo = ({
  open,
  setOpen,
  onSucess,
}: ModalBoolean) => {
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<CourseType[]>([])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const getData = useGetData()
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  // ================= FETCH GROUPS =================
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await getData("group/get-all-group", "GET")

      if (res?.data && Array.isArray(res.data)) {
        setCourses(res.data)
      } else {
        setCourses([])
      }
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
    if (open) {
      fetchCourses()
    }
  }, [open])

  // ================= OUTSIDE CLICK CLOSE =================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ================= TOGGLE GROUP =================
  const toggleGroup = (id: string) => {
    setSelectedGroups((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id]
    )
  }

  // ================= FILTER =================
  const filteredCourses = courses.filter((course) => {
    const name =
      typeof course.name === "string"
        ? course.name
        : (course as any)?.name?.name || ""

    return name.toLowerCase().includes(search.toLowerCase())
  })

  // ================= SUBMIT =================
  const onSubmit = async (formData: FormValues) => {
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

    try {
      setLoading(true)

      const res = await getData(
        "student/create-student",
        "POST",
        payload
      )

      if (res.status === 403) {
        toast.error("Xatolik yuz berdi")
      } else {
        toast.success("Student muvaffaqiyatli qo'shildi")
        reset()
        setSelectedGroups([])
        setSearch("")
        setOpen(false)
        onSucess()
      }
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
          <AlertDialogTitle>Add new Student</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* FIRST NAME */}
          <div>
            <Label>Firstname</Label>
            <Input
              {...register("first_name", {
                required: "Please enter firstname",
              })}
              placeholder="Alisher"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* LAST NAME */}
          <div>
            <Label>Lastname</Label>
            <Input
              {...register("last_name", {
                required: "Please enter lastname",
              })}
              placeholder="Yusupov"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <Label>Telefon Raqam</Label>
            <Input
              {...register("phone", {
                required: "Please enter phone",
              })}
              placeholder="+998 77 044 46 46"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* SEARCH SELECT */}
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
              <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
                {filteredCourses.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    Guruh topilmadi
                  </div>
                ) : (
                  filteredCourses.map((course) => {
                    const name =
                      typeof course.name === "string"
                        ? course.name
                        : (course as any)?.name?.name

                    return (
                      <div
                        key={course._id}
                        onClick={() => {
                          setShowDropdown(false)
                          toggleGroup(course._id)
                          setSearch("")
                        }}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {name}
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>

          {/* SELECTED GROUPS BOX */}
          {selectedGroups.length > 0 && (
            <div className="border rounded-lg p-3 bg-muted/30">
              <p className="text-sm font-medium mb-2">
                Tanlangan guruhlar:
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedGroups.map((id) => {
                  const course = courses.find(
                    (c) => c._id === id
                  )

                  const name =
                    typeof course?.name === "string"
                      ? course.name
                      : (course as any)?.name?.name

                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-md text-sm"
                    >
                      <span>{name}</span>

                      <button
                        type="button"
                        onClick={() => toggleGroup(id)}
                        className="hover:text-red-200"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel
              type="button"
              onClick={() => setOpen(false)}
            >
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