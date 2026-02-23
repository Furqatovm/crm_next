"use client"
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetData } from '@/hooks/useAxios/axios';
import { SkeletonTable } from '@/components/skeleton/table';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { AlertDialogDemo } from './modal';
import { TableActions } from './table';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { setLogout } from '@/store/auth-slice';

const Managers = () => {
  const items = [
    { label: "Hammasi", value: "all" },
    { label: "ta'tilda", value: "ta'tilda" },
    { label: "Faol", value: "faol" },
    { label: "Yakunladi", value: "yakunladi" },
  ];

  const [params, setParams] = useState<string>("all");
  const getData = useGetData();
  const [loading, setLoading] =useState<boolean>(false);
  const [searchValue, setSearchValue]=useState<string>("")
  const [data, setData] = useState<any>([]);
  const [isOpenModal, setIsOpenModal] =useState<boolean>(false);

  const dispatch =useDispatch();
  const router =useRouter();


  const fetchData = async () => {
    try {
      setLoading(true)
      const queryParams = {
        ...(params !== "all" && { status: params }),
        ...(searchValue.trim() && { search: searchValue.trim() }),
      };
            const res = await getData("student/get-all-students", "GET", undefined, queryParams);
      setData(res?.data);
      setLoading(false)
    } catch (err:any) {
      console.log(err);
      if(err.message =="Invalid token"){
        dispatch(setLogout());
        router.push("/login")
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [params, searchValue]);
  
  return (
    <div>
      <AlertDialogDemo open={isOpenModal} onSucess ={() =>fetchData()} setOpen={setIsOpenModal} />
      <div className='flex justify-between items-center py-3'>
        <h1 className='text-[1.5rem] font-semibold py-2 px-1'>Foydalanuvchilar ro'yxati</h1>

        <div className='flex gap-4 items-center'>
        <InputGroup className="max-w-xs">
      <InputGroupInput onChange={(e) =>setSearchValue(e.target.value)} placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">{data?.length ==0? 0 : data.length} results</InputGroupAddon>
    </InputGroup>
        <Button className='cursor-pointer' onClick={() =>setIsOpenModal(true)}><Plus /><span>Student Qo'shish</span></Button>

<Select value={params} onValueChange={(e) => setParams(e)}>
  <SelectTrigger className="w-full max-w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
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

      {
        loading ? 
        <SkeletonTable />
        :
        <TableActions data={data}  onSucess ={() =>fetchData()} />
      }
    </div>
  );
};

export default Managers;
