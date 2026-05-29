import { Link } from "react-router";
import { Dialog, DialogContent, DialogTrigger } from "./shadcn/dialog";

export default function ShortUrl() {
  return (
    <Dialog>
      <DialogTrigger><img src="/imgs/HCM.png" className="size-10 cursor-pointer" /></DialogTrigger>
      <DialogContent
        className="min-w-300 max-w-none h-100 bg-neutral-100 flex justify-center items-center text-9xl font-semibold">
        <Link to="https://bit.ly/doanketvn" target="_blank"
          className="text-blue-400 hover:text-blue-500">
          bit.ly/doanketvn
        </Link>
      </DialogContent>
    </Dialog>
  )
}
