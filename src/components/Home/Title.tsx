import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Title() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200); // match animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="h-[50rem] bg-[url(/imgs/part1-1.jpg)] bg-cover">
        <div className="size-full bg-yellow-800/50 grid grid-rows-[1fr_5rem]">
          <div className="flex flex-col gap-6 justify-center items-center
         text-gray-200 text-center text-7xl font-title px-80">
            <h2 className={clsx("drop-shadow-lg drop-shadow-black", !loaded ? "animate-fallDown" : "hover:animate-wiggle")}>ĐẠI ĐOÀN KẾT</h2>
            <p className={clsx("drop-shadow-lg drop-shadow-black font-sans", !loaded ? "animate-slideLeft" : "hover:animate-wiggle")}>-</p>
            <h2 className={clsx("drop-shadow-lg drop-shadow-black", !loaded ? "animate-slideRight" : "hover:animate-wiggle")}>Sức mạnh dân tộc Việt Nam</h2>

            <em className={clsx("flex min-h-20 hover:animate-wiggle font-sans justify-center items-center w-full text-white text-2xl text-center mt-20 drop-shadow-lg drop-shadow-black",
              !loaded ? "animate-riseUp" : "hover:animate-wiggle"
            )}>
              “Kết nối truyền thống – Ứng dụng công nghệ – Lan tỏa giá trị đoàn kết”
            </em>
          </div>

          <div className={clsx("group z-50 w-80 absolute top-26 left-10")}>
            <img className={clsx("rotate-16", !loaded ? "animate-fallDown" : "group-hover:animate-spin")} src="/imgs/vn-ctr.png" />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col py-6 justify-center items-center bg-gradient-to-br from-red-400/60 to-yellow-400/60 mask-b-from-90% mask-b-to-100%">
        <ChevronDownIcon className="size-10 animate-arrowFlow text-white font-bold" />
        <ChevronDownIcon className="size-10 animate-arrowFlow text-white font-bold" />
        <ChevronDownIcon className="size-10 animate-arrowFlow text-white font-bold" />
      </div>
      
      <div className="flex justify-center items-center gap-26 mt-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/AtbQeFo0c0U?si=4JkfVJH7e3KUuxtq"
          title="YouTube video player 1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/euqtheBsAYo?si=a7QCMlQutgZRi4ic"
          title="YouTube video player 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
