"use client"
import { useState } from 'react';
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
  const [searchValue, setSearchValue] = useState<string>("")
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data, refetch, isLoading } = useQueryHandler({
    url: "group/get-all-group",
    pathname: "get-groups", 
    param: {
      search: searchValue || undefined
    }
  });

  return (
    <div>
      <AlertDialogDemo open={isOpenModal} onSucess={() => refetch()} setOpen={setIsOpenModal} />
      
      <div className='flex justify-between items-center py-3'>
        <h1 className='text-[1.5rem] font-semibold py-2 px-1'>Guruhlar ro'yxati</h1>

        <div className='flex gap-4 items-center'>
          <InputGroup className="max-w-xs">
            <InputGroupInput 
              onChange={(e) => setSearchValue(e.target.value)} 
              placeholder="Search..." 
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Button className='cursor-pointer' onClick={() => setIsOpenModal(true)}>
            <Plus />
            <span>Guruh qo'shish</span>
          </Button>
        </div>
      </div>

      {/* 2. O'zingizning loading statengiz o'rniga isLoading ishlatildi */}
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <TableActions data={data?.data || []} onSucess={() => refetch()} />
      )}
    </div>
  );
};

export default Managers;