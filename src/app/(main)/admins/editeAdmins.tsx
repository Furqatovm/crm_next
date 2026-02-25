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
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UserType } from "@/@types/@types"
import { useEditAdmins } from "@/hooks/useQuery/useQueryAction"

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  userInfo: UserType | null
  onSucess: () => void
}

interface FormValues {
  first_name: string
  last_name: string
  email: string
}

export const EditeAdmins = ({
  open,
  setOpen,
  userInfo,
  onSucess,
}: ModalProps) => {
  const { mutate, isPending } = useEditAdmins()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // Modal ochilganda inputlar foydalanuvchi ma'lumotlari bilan to'lib turishi uchun
    values: {
      first_name: userInfo?.first_name || "",
      last_name: userInfo?.last_name || "",
      email: userInfo?.email || "",
    }
  })

  const onSubmit = (data: FormValues) => {
    if (!userInfo?._id) {
      toast.error("User topilmadi")
      return
    }

    const payload = {
      _id: userInfo._id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      status:userInfo?.status
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success("Ma'lumotlar muvaffaqiyatli yangilandi");
        setOpen(false);
        onSucess(); // Ro'yxatni yangilash uchun
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Xatolik yuz berdi");
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adminni tahrirlash</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Ism Input */}
          <div>
            <Label>Ism</Label>
            <Input
              placeholder="Ismni kiriting"
              {...register("first_name", { required: "Ism majburiy" })}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
            )}
          </div>

          {/* Familiya Input */}
          <div>
            <Label>Familiya</Label>
            <Input
              placeholder="Familiyani kiriting"
              {...register("last_name", { required: "Familiya majburiy" })}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Emailni kiriting"
              {...register("email", { 
                required: "Email majburiy",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              type="button"
              onClick={() => setOpen(false)}
            >
              Bekor qilish
            </AlertDialogCancel>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}