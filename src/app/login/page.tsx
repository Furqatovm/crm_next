"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/hooks/useAxios/axios";
import { setUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] =useState<boolean>(false)
  const router =useRouter()
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await login(data);
      console.log("Login muvaffaqiyatli:", response.data);
      dispatch(setUser(response.data));
      setLoading(false)
      
      toast.success("Login muvaffaqiyatli bo'ldi")
      router.push("/")
    } catch (error: any) {
      console.log("Login xatoligi:", error.message);
      toast.error(`xatolik yuz berid: ${error}`)
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-5 py-10 shadow-xl border-transparent rounded-3xl">
        <CardHeader>
          <h1 className="text-[1.5rem] text-center font-bold">Xush kelibsiz 👋</h1>
          <CardDescription>
            Hisobingizga kirish uchun email va parolni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: "Email majburiy" })}
                  className="border-none"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password", { required: "Parol majburiy" })}
                  className="border-none"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit" 
            onClick={handleSubmit(onSubmit)}
            variant="outline"
            className="w-full bg-primary hover:bg-primary hover:opacity-90 hover:text-white text-white cursor-pointer"
          >
            Kirish
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
