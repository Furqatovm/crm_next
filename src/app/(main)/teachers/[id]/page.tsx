"use client"

import { formatISOToSimpleTime, UserType } from "@/@types/@types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonCard from "@/genetics/skeleton";
import { useQueryHandler } from "@/hooks/useAxios/useFetchdata";
import { use } from "react";

export const TeacherProfile = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { data, isLoading } = useQueryHandler({
    url: `teacher/get-teacher/${id}`,
    pathname: `get-teacher-${id}`
  });


if (isLoading) return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full">
    {Array.from({ length: 3 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);  if (!data?.data) return <div className="p-6 text-center">Ma'lumot topilmadi</div>;

  const teacher = data.data; 

  const workEnd = formatISOToSimpleTime(teacher.work_end) || "Mavjud emas";
  const workDate = formatISOToSimpleTime(teacher.work_date) || "Mavjud emas";
  const createdAt = formatISOToSimpleTime(teacher.createdAt) || "Mavjud emas";
  const updateTime = formatISOToSimpleTime(teacher.updatedAt) || "Mavjud emas";

  const totalStudents = teacher.groups?.reduce((acc: number, group: any) => {
    return acc + (group.students?.length || 0);
  }, 0) ?? 0;

  return (
    <div className="min-h-screen dark:bg-gray-950 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Chap panel */}
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 flex flex-col items-center relative">
          <Avatar className="h-24 w-24">
            {teacher.image ? (
              <AvatarImage
                className="border border-primary object-cover"
                src={teacher.image}
                alt={`${teacher.first_name} ${teacher.last_name}`}
              />
            ) : (
              <AvatarFallback>
                <span className="text-2xl font-semibold">
                  {`${teacher.first_name?.[0] || ""}${teacher.last_name?.[0] || ""}`}
                </span>
              </AvatarFallback>
            )}
          </Avatar>
          
          <h2 className="mt-4 text-2xl font-semibold text-center">
            {teacher.first_name} {teacher.last_name}
          </h2>
          <p className="text-white rounded-2xl absolute right-2 top-2 px-3 py-1 bg-primary text-xs">
            Ustoz
          </p>

          <div className="mt-6 w-full space-y-3 text-sm">
            <InfoRow label="Email" value={teacher.email} />
            <InfoRow label="Telefon" value={teacher.phone} />
            <InfoRow label="Yo‘nalish" value={teacher.field} />
            <InfoRow label="Status" value={teacher.status} />
            <InfoRow label="Ish boshlagan" value={workDate} />
            <InfoRow label="Ish tugatgan" value={workEnd} />
            <InfoRow label="Ro'yxatdan o'tgan" value={createdAt} />
            <InfoRow label="Oxirgi tahrir" value={updateTime} />
          </div>
        </div>

        {/* O‘ng panel */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard 
            title="Oylik maosh" 
            value={`${teacher.salary?.toLocaleString() || 0} UZS`} 
            change="0%" 
          />
          <StatCard 
            title="Guruhlar soni" 
            value={`${teacher.groups?.length || 0}`} 
            change="0%" 
          />
          <StatCard 
            title="Studentlar soni" 
            value={`${totalStudents}`} 
            change="0%" 
          />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1">
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}:</span>
      <span className="text-gray-600 dark:text-gray-400 text-right">{value || "—"}</span>
    </div>
  )
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 hover:shadow-2xl transition">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-primary">{value}</p>
      <p className="text-sm text-green-500 mt-1">{change} • Oxirgi Oy holati</p>
    </div>
  )
}

export default TeacherProfile;