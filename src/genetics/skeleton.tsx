import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard =() => {
  return (
    <Card className="w-full">
     
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardFooter>
    </Card>
  )
}
export default SkeletonCard