"use client"

import { TableActions } from '@/components/table/table'
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SkeletonTable } from '@/components/skeleton/table';
import { fetchManagers, useQueryHandler } from '@/hooks/useAxios/useFetchdata';

const Managers = () => {

  const items = [
    { label: "Hammasi", value: "all" },
    { label: "Ishdan bo'shatilgan", value: "ishdan bo'shatilgan" },
    { label: "Faol", value: "faol" },
  ];

  const [params, setParams] = useState<string>("all");

 const {data, isLoading} =useQueryHandler({
  url:"staff/all-managers",
  pathname:"get-managers",
  param:
    params !== "all"
      ? { status: params }
      : undefined,
  
 })

  return (
    <div>
      <div className='flex justify-between items-center py-3'>
        <h1 className='text-[1.5rem] font-semibold py-2 px-1'>
          Foydalanuvchilar ro'yxati
        </h1>

        <div className='flex gap-4 items-center'>
          <Select value={params} onValueChange={(e) => setParams(e)}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <TableActions data={data?.data} />
      )}
    </div>
  );
};

export default Managers;