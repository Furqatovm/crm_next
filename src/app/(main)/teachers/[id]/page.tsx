"use client"

import { formatISOToSimpleTime, TeacherType, User } from "@/@types/@types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetData } from "@/hooks/useAxios/axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export const  TeacherProfile = ({ params }: { params: Promise<{ id: string }> }) => {
// teacher/get-teacher
const [loading, setLoading] =useState<boolean>(false);
const [data, setData] =useState<TeacherType>()

const router =useRouter();
const getData =useGetData()
const resolvedParams = use(params);
  const id = resolvedParams.id;
  const workEnd =formatISOToSimpleTime(data?.work_end as string) || null
  const workDate =formatISOToSimpleTime(data?.work_date as string);
  const createdAt =formatISOToSimpleTime(data?.createdAt as string);
  const updateTime =formatISOToSimpleTime(data?.updatedAt as string);

  const totalStudents = data?.groups.reduce((acc, group) => {
    return acc + group.students.length
  }, 0) ?? 0
  
  console.log(data)


const fetchData = async () => {
  try {
    setLoading(true)
          const res = await getData(`teacher/get-teacher/${id}`, "GET", undefined);
    setData(res?.data);
    setLoading(false)
  } catch (err:any) {
    console.log(err);
    if(err.message =="Invalid token"){
      router.push("/login")
    }
  }
};

useEffect(() => {
  fetchData();
}, [id]);

  return (
    <div className="min-h-screen  dark:bg-gray-950 p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white  dark:bg-gray-900 shadow-xl rounded-xl p-6 flex flex-col items-center relative">
            <Avatar className="h-25 w-25">
          {data?.image ? (
          <AvatarImage
            className="border  border-primary"
            src={data?.image}
            alt={`${data?.first_name} ${data?.last_name}`}
          />
        ) : (
          <AvatarFallback>
            <span className="text-[1.5rem] font-semibold">{`${data?.first_name?.[0] || ""}${data?.last_name?.[0] || ""}`}</span>
          </AvatarFallback>
        )}
            </Avatar>
          <h2 className="mt-4 text-2xl font-semibold">Davron01 Raimjonov</h2>
          <p className="text-white rounded-2xl absolute right-2 top-2 p-px px-2 bg-primary ">Ustoz</p>

          {/* Info list */}
          <div className="mt-6 w-full space-y-3 text-sm">
            <InfoRow label="Email" value={`${data?.email}`} />
            <InfoRow label="Telefon" value={`${data?.phone}`} />
            <InfoRow label="Yo‘nalish" value={`${data?.field}`} />
            <InfoRow label="Status" value={`${data?.status}`} />
            <InfoRow label="Work Date" value={`${workDate}`} />
            <InfoRow label="Work End" value={`${workEnd}`} />
            <InfoRow label="Created At" value={`${createdAt}`} />
            <InfoRow label="Updated At" value={`${updateTime}`} />
          </div>
        </div>

        {/* O‘ng panel */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Oylik maosh" value={`${data?.salary?.toLocaleString()} usz`} change="0%" />
          <StatCard title="Guruhlar soni" value={`${data?.groups.length}`} change="0%" />
          <StatCard title="Studentlar soni" value={`${totalStudents}`} change="0%" />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}:</span>
      <span className="text-gray-600 dark:text-gray-400">{value}</span>
    </p>
  )
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-primary dark:text-text-gray-700">{value}</p>
      <p className="text-sm text-green-500 mt-1">{change} • Oxirgi Oy holati</p>
    </div>
  )
}


export default TeacherProfile