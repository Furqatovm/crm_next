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
import { useQueryHandler } from "@/hooks/useAxios/useFetchdata";

export const TeacherProfile = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { data, isLoading } = useQueryHandler({
    url: `student/student/${id}`,
    pathname: `student-${id}`
  });

  const student = data?.data;
  const joinedDate = student?.createdAt ? formatISOToSimpleTime(student.createdAt) : "Mavjud emas";

  if (isLoading) return null; // Yuklanish vaqtida xato bermasligi uchun

  return (
    <div className="p-6 space-y-6  min-h-screen text-primary">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-25 h-25">
              <AvatarFallback>
                <span className="text-[1.5rem] font-semibold">
                  {`${student?.first_name?.[0] || ""}${student?.last_name?.[0] || ""}`}
                </span>
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">{`${student?.first_name || ""} ${student?.last_name || ""}`}</h2>
              <p className="text-primary">
                Telefon: {student?.phone}
              </p>
            </div>
          </div>

          <div className="text-right space-y-2">
            <Badge className="bg-primary">{student?.status}</Badge>
            <p className="text-primary">{joinedDate}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>O‘qimoqda</CardTitle>
            <span className="text-primary text-[1.2rem] font-semibold">
              {student?.groups?.length || 0}
            </span>
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
              <TableBody>
                {student?.groups?.map((val: StudentGroupType, index: number) => (
                  <TableRow key={val._id} className="text-primary text-[1rem]">
                    <TableCell>{index + 1}</TableCell>
                    {/* Xatolik bergan joy: Optional chaining qo'shildi */}
                    <TableCell>{val?.group?.name || "O'chirilgan"}</TableCell>
                    <TableCell className="text-blue-600 font-medium">
                      {val.status}
                    </TableCell>
                    <TableCell>{formatISOToSimpleTime(val.joinedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tatil tarixi</CardTitle>
            <span className="text-[1.2rem] font-semibold text-primary">
              {student?.leave_history?.length || 0}
            </span>
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
              <TableBody>
                {student?.leave_history?.map((val: LeaveHistoryType, index: number) => (
                  <TableRow key={val._id} className="text-primary text-[1rem]">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.days}</TableCell>
                    <TableCell>{val.reason}</TableCell>
                    <TableCell>{formatISOToSimpleTime(val.start_date)}</TableCell>
                    <TableCell>{formatISOToSimpleTime(val.end_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherProfile;