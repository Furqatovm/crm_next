import { Skeleton } from "@/components/ui/skeleton"

export const  SkeletonTable =() => {
  return (
    <div className="flex w-full  flex-col gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-7 flex-1" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-20" />
        </div>
      ))}
    </div>
  )
}
