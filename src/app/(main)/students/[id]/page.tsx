"use client";

import { formatISOToSimpleTime, LeaveHistoryType, StudentGroupType, StudentFullType,  } from "@/@types/@types";
import { useGetData } from "@/hooks/useAxios/axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TeacherProfile = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StudentFullType>();

  const router = useRouter();
  const getData = useGetData();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const joinedDate =formatISOToSimpleTime(data?.createdAt as string)

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getData(`student/student/${id}`, "GET", undefined);
      setData(res?.data);
      setLoading(false);
      console.log(res?.data);
    } catch (err: any) {
      console.log(err);
      if (err.message == "Invalid token") {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="p-6 space-y-6  min-h-screen text-primary">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
          <Avatar className="w-25 h-25">

          <AvatarFallback>
            <span className="text-[1.5rem] font-semibold">{`${data?.first_name?.[0] || ""}${data?.last_name?.[0] || ""}`}</span>
          </AvatarFallback>
      </Avatar>

            <div>
              <h2 className="text-xl font-semibold">{`${data?.first_name} ${data?.last_name}`}</h2>
              <p className="text-primary">
                Telefon: {(data?.phone)}
              </p>
            </div>
          </div>

          <div className="text-right space-y-2">
            <Badge className="bg-primary">{data?.status}</Badge>
            <p className="text-primary">{joinedDate}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>O‘qimoqda</CardTitle>
            <span className="text-primary text-[1.2rem] font-semibold">1</span>
          </CardHeader>


          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Holati</TableHead>
                  <TableHead>Qo‘shilgan</TableHead>
                </TableRow>
              </TableHeader>
            {
              data?.groups?.map((val:StudentGroupType, index :number) =>{
              return   <TableBody key={val._id} className="text-primary text-[1rem]">
                <TableRow> 
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{val.group.name}</TableCell>
                  <TableCell className="text-blue-600 font-medium">
                  {val.status}
                  </TableCell>
                  <TableCell>{formatISOToSimpleTime(val.joinedAt)}</TableCell>
                </TableRow>
              </TableBody>
              })
            }
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tatil tarixi</CardTitle>
            <span className="text-[1.2rem] font-semibold text-primary">1</span>
          </CardHeader>


          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Kun</TableHead>
                  <TableHead>Sabab</TableHead>
                  <TableHead>Boshlagan</TableHead>
                  <TableHead>Tugagan</TableHead>
                </TableRow>
              </TableHeader>
              {data?.leave_history.map((val :LeaveHistoryType, index:number) =>{
                return <TableBody key={val._id} className="text-primary text-[1rem]">
                <TableRow>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{val.days}</TableCell>
                  <TableCell>{val.reason}</TableCell>
                  <TableCell>{formatISOToSimpleTime(val.start_date)}</TableCell>
                  <TableCell>{formatISOToSimpleTime(val.end_date)}</TableCell>
                </TableRow>
              </TableBody>
              })}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;
