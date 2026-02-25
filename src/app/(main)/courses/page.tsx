"use client"

import { CourseType } from "@/@types/@types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGetData } from "@/hooks/useAxios/axios"
import { Clock, Pen, Plus, Snowflake, ThermometerIcon, Trash, UsersRound } from "lucide-react"
import { useEffect, useState } from "react"
import { AddCategoryModal } from "./modal"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { setLogout } from "@/store/auth-slice"
import { AddCourseModal } from "./add-course"
import { EditedCourseModal } from "./edit-course"
import toast from "react-hot-toast"
import SkeletonCard from "@/genetics/skeleton"
import { useQueryHandler } from "@/hooks/useAxios/useFetchdata"
import { useFreezeCourse, useUnfreezeCourse } from "@/hooks/useQuery/useQueryAction"

const Courses = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const getData = useGetData()

  const [loading, setLoading] = useState<boolean>(false)
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [courseModal, setCourseModal]= useState<boolean>(false)
  const [editedCourse, setEditedCourse] =useState<boolean>(false);
  const [courseInfo, setCourseInof] =useState<CourseType | null>(null)

  const {data, refetch} =useQueryHandler({
    url:"course/get-courses",
    pathname:`all-courses`,
  })


  
  const DeleteCourse = async (userId: string) => {
    if(!userId){
      return  toast.error("iltimos tanlang")
    }
    try {
      const res = await getData("course/delete-course", "DELETE", {course_id: userId} );
      console.log(res)
      toast.success("user ishga qaytarildi")
      refetch()
    } catch (err:any) {
      console.log(err.message);
      toast.error(`${err.message}`)
    }
  };


  
  
  const {mutate:FreezeCourse} =useFreezeCourse()
  const {mutate:AntiFreezeCourse} =useUnfreezeCourse()







  return (
    <div>
      <AddCategoryModal
        open={categoryModal}
        setOpen={setCategoryModal}
        onSucess={() => refetch()}
      />
      <AddCourseModal open={courseModal} setOpen={setCourseModal} onSucess={() =>refetch()} />
        <EditedCourseModal open={editedCourse} setOpen={setEditedCourse} onSucess={() =>refetch()} courseInfo={courseInfo} />

      <div className="flex justify-between items-center py-3">
        <h1 className="text-[1.5rem] font-semibold py-2 px-1">
          Kurslar ro'yhati
        </h1>

        <div className="flex gap-4 items-center">
          <Button onClick={() => setCategoryModal(true)}>
            <Plus />
            <span>Kategoriya qo'shish</span>
          </Button>

          <Button onClick={() =>setCourseModal(true)}>
            <Plus />
            <span>Course qo'shish</span>
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
      {loading  ?
      Array.from({length: 3}).map((_, index) =>{
       return <SkeletonCard key={index} />
      })
      :
      data?.data.map((val:CourseType) => (
        <Card
          key={val._id}
          className="p-7 text-primary flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-[1.5rem] font-bold flex-1 wrap-break-word">
                {val?.name?.name ?? "Nomi yo'q"}
              </h2>

              <span className="bg-gray-100 font-semibold p-1 px-2 rounded-sm whitespace-nowrap shrink-0">
                {val?.price
                  ? val.price.toLocaleString()
                  : 0}{" "}
                UZS
              </span>
            </div>

            <span className="block text-gray-500 my-1">
              {val?.description ?? ""}
            </span>
          </div>

          <div className="flex gap-2 flex-col mt-4">
            <div className="flex gap-4 items-center text-[1rem] text-gray-500">
              <Clock size={20} />
              <span>{val?.duration ?? "-"}</span>
            </div>

            <div className="flex gap-4 items-center text-[1rem] text-gray-500">
              <UsersRound size={20} />
              <span>15 students</span>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button  onClick={() =>{
              setCourseInof(val)
              setEditedCourse(true)
            }}
              >
              <Pen /> Tahrirlash
            </Button>

            <Button onClick={() =>DeleteCourse(val?._id)} className="bg-red-600">
              <Trash /> O'chirish
            </Button>

          {
              val?.is_freeze?
              <Button disabled={loading} className="bg-blue-700" onClick={() =>AntiFreezeCourse(val?._id)}> <ThermometerIcon />{loading? "Eritish..." : "Eritish"}</Button>
              :
              <Button disabled={loading} onClick={() =>FreezeCourse(val?._id)} className="bg-blue-700">
              <Snowflake /> {loading? "Muzlatish..." :"Muzlatish"}           
              </Button>
          }
          </div>
        </Card>
      ))
      }
      </div>
    </div>
  )
}

export default Courses