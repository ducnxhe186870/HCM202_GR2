import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[100svh] bg-amber-50 flex justify-center items-center">
      <LoaderCircle className="animate-spin size-26 text-red-500"/>
    </div>
  )
}
