"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { Calendar, Camera } from "lucide-react"
import React, { useRef, useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { formatISOToSimpleTime } from "@/@types/@types"
import { useForm } from "react-hook-form"
import { useGetData } from "@/hooks/useAxios/axios"
import toast from "react-hot-toast"

type ProfileFormValues = {
  first_name: string
  last_name: string
  email: string
}

const Profile = () => {
    const getData =useGetData()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const userString = Cookies.get("user")
  const user = userString ? JSON.parse(userString) : null

  const EditedProfile = async (data:ProfileFormValues) => {
    try {
      const res = await getData("auth/edit-profile", "POST", {...data} );
      console.log(res)
      toast.success("user ishga qaytarildi")
    } catch (err:any) {
      console.log(err.message);
    }
  };

  
  const EditedImage = async (image:string) => {
    try {
      const res = await getData("auth/edit-profile", "POST", {image} );
      console.log(res)
      toast.success("user ishga qaytarildi")
    } catch (err:any) {
      console.log(err.message);
    }
  };



  const { register, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form data:", data)
    Cookies.set("user", JSON.stringify({ ...user, ...data }))
    EditedProfile(data)
    console.log(data)
  }

  const handleClick = () => {
    fileRef.current?.click()

  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)

    }
  }

  if (!user) return null





  

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={preview || user.image} />
                <AvatarFallback>
                  {user.first_name?.[0]}
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
                onClick={handleClick}
                className="absolute bottom-0 right-0 bg-background rounded-full p-2 shadow-md border hover:bg-muted transition"
              >
                <Camera size={16} />
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.first_name} {user.last_name}
              </h2>

              <p className="text-muted-foreground">
                {user.email}
              </p>

              <div className="flex items-center gap-2 mt-2 text-sm">
                <Calendar size={16} />
                <span>
                  Qo'shilgan: {formatISOToSimpleTime(user.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="px-3 py-1 text-white rounded-md bg-red-600 text-sm">
            {user.role}
          </div>
        </div>
      </Card>

      <Card className="p-6 mt-6">
        <CardTitle>Profil ma'lumotlari</CardTitle>
        <span className="text-sm text-muted-foreground">
          Shaxsiy ma'lumotlaringizni yangilashingiz mumkin.
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 mt-6"
        >
          <div>
            <Label className="mb-2">Ism</Label>
            <Input {...register("first_name")} />
          </div>

          <div>
            <Label className="mb-2">Familya</Label>
            <Input {...register("last_name")} />
          </div>

          <div>
            <Label className="mb-2">Email</Label>
            <Input {...register("email")} />
          </div>

          <div>
            <Label className="mb-2">Rol</Label>
            <Input defaultValue={user.role} />
          </div>

          <div className="col-span-full flex gap-4 justify-end">
            <Button type="button" variant="outline">
              Parolni o'zgartirish
            </Button>

            <Button type="submit">
              O'zgaritish
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Profile