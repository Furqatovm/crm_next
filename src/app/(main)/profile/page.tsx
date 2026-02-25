"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { Calendar, Camera, Loader2 } from "lucide-react"
import React, { useRef, useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { formatISOToSimpleTime } from "@/@types/@types"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useEditedProfile, useEditedProfileImage } from "@/hooks/useQuery/useQueryAction"

type ProfileFormValues = {
  first_name: string
  last_name: string
  email: string
}

const Profile = () => {
  const { mutate: EditedProfileData, isPending: isSavingInfo } = useEditedProfile();
  const { mutate: EditedProfileImage, isPending: isUploadingImg } = useEditedProfileImage();
  
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const userString = Cookies.get("user")
  const user = userString ? JSON.parse(userString) : null

  const { register, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    EditedProfileData(data, {
      onSuccess: () => {
        const updatedUser = { ...user, ...data };
        Cookies.set("user", JSON.stringify(updatedUser));
      }
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)

      const formData = new FormData()
      formData.append("image", file) 

      EditedProfileImage(formData, {
        onSuccess: (res: any) => {
          const newImg = res?.data?.image || imageUrl;
          const updatedUser = { ...user, image: newImg };
          Cookies.set("user", JSON.stringify(updatedUser));
        },
        onError: () => {
          setPreview(null);
        }
      })
    }
  }

  const handleClick = () => fileRef.current?.click()

  if (!user) return <div className="p-10 text-center">Yuklanmoqda...</div>

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Avatar className="w-24 h-24 border">
                <AvatarImage src={preview || user.image} className="object-cover" />
                <AvatarFallback className="text-xl">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </AvatarFallback>
              </Avatar>

              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              <button
                type="button"
                disabled={isUploadingImg}
                onClick={handleClick}
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-md border hover:opacity-90 transition disabled:opacity-50"
              >
                {isUploadingImg ? <Loader2 className="animate-spin" size={16} /> : <Camera size={16} />}
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>Qo'shilgan: {formatISOToSimpleTime(user.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="px-3 py-1 text-white rounded-md bg-red-600 text-sm font-medium uppercase">
            {user.role}
          </div>
        </div>
      </Card>

      <Card className="p-6 mt-6">
        <CardTitle className="mb-1">Profil ma'lumotlari</CardTitle>
        <p className="text-sm text-muted-foreground mb-6">
          Shaxsiy ma'lumotlaringizni yangilashingiz mumkin.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Ism</Label>
            <Input {...register("first_name", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label>Familya</Label>
            <Input {...register("last_name", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...register("email", { required: true })} type="email" />
          </div>

          <div className="space-y-2">
            <Label>Rol (O'zgartirib bo'lmaydi)</Label>
            <Input defaultValue={user.role} disabled className="bg-muted" />
          </div>

          <div className="col-span-full flex gap-4 justify-end mt-4">
            <Button type="button" variant="outline">
              Parolni o'zgartirish
            </Button>
            <Button type="submit" disabled={isSavingInfo}>
              {isSavingInfo ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Profile