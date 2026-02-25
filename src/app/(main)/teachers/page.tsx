"use client"
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
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { AlertDialogDemo } from './modal';
import { TableActions } from './table';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useQueryHandler } from '@/hooks/useAxios/useFetchdata';

const Managers = () => {
  const items = [
    { label: "Hammasi", value: "all" },
    { label: "Ishdan bo'shatilgan", value: "ishdan bo'shatilgan" },
    { label: "Faol", value: "faol" },
  ];

  const [params, setParams] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQueryHandler({
    url: "teacher/get-all-teachers",
    pathname: "get-all-teachers", 
    param: {
      status: params !== "all" ? params : undefined,
      search: searchValue || undefined
    }
  });

  const resultsCount = data?.data?.length ?? 0;

  return (
    <div>
      <AlertDialogDemo 
        open={isOpenModal} 
        onSucess={() => refetch()} 
        setOpen={setIsOpenModal} 
      />

      <div className='flex justify-between items-center py-3'>
        <h1 className='text-[1.5rem] font-semibold py-2 px-1'>Ustozlar ro'yxati</h1>

        <div className='flex gap-4 items-center'>
          <InputGroup className="max-w-xs">
            <InputGroupInput 
              onChange={(e) => setSearchValue(e.target.value)} 
              placeholder="Search..." 
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {resultsCount} results
            </InputGroupAddon>
          </InputGroup>

          <Button className='cursor-pointer' onClick={() => setIsOpenModal(true)}>
            <Plus />
            <span>Ustoz Qo'shish</span>
          </Button>

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
        <TableActions data={data?.data ?? []} onSucess={() => refetch()} />
      )}
    </div>
  );
};

export default Managers;