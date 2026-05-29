import { useEffect, useRef, useState } from 'react'

function useInView(options?: IntersectionObserverInit) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!elementRef.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      })
    }, options ?? { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

    observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [options])

  return { ref: elementRef, inView }
}

export default function Part5() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const sec1 = useInView()
  const sec2 = useInView()
  const sec3 = useInView()
  const sec4 = useInView()
  const sec5 = useInView()

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0d0e12] to-[#12131a] pb-12 select-none">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("/imgs/part1-1.jpg")' }}
      ></div>
      <div className="z-0 absolute size-full top-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950/80 pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              ref={sec1.ref}
              className={`text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent inline-block transition-all duration-700 ease-out ${sec1.inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
            >
              Phương thức xây dựng khối đại đoàn kết dân tộc
            </h1>
            <div className="mt-2 inline-block px-6 py-2.5 bg-amber-500/10 backdrop-blur-lg rounded-2xl border border-amber-500/30 shadow-2xl">
              <p className="text-sm md:text-base text-amber-400 font-medium font-heading">
                Thực hành dân vận, tổ chức, quy tụ sức mạnh
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Phần 1 */}
            <div
              ref={sec2.ref}
              className={`gold-glow-panel rounded-2xl p-6 border border-amber-900/30 bg-[#161722]/85 shadow-2xl transition-all duration-700 ease-out transform ${sec2.inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
                } hover:shadow-3xl`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-3 font-heading">
                Làm tốt công tác vận động quần chúng (dân vận)
              </h2>
              <p className="text-base text-neutral-300 mb-4 leading-relaxed">
                Đây là phương thức cơ bản nhất. Hồ Chí Minh khẳng định:
                <span className="font-bold text-amber-300 italic">
                  {' '}
                  "Dân vận khéo thì việc gì cũng thành công."
                </span>
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-300">
                <li>Phải gần dân, hiểu dân, tin dân và làm cho dân tin Đảng.</li>
                <li>
                  Hồ Chí Minh dặn:
                  <span className="italic text-amber-500">
                    "cần phải chịu khó tìm đủ cách giải thích cho họ hiểu rằng: những việc đó là vì ích lợi của họ mà phải làm"
                  </span>
                </li>
                <li>
                  Mọi phương pháp tiếp cận đều phải phù hợp với tâm tư, nguyện vọng của quần chúng.
                </li>
                <li>
                  Phải xuất phát từ thực tế trình độ dân trí và văn hoá riêng biệt của từng địa phương, từng đối tượng.
                </li>
              </ul>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${open1
                  ? 'max-h-[1000px] opacity-100 mt-4'
                  : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="bg-black/30 rounded-xl p-4 border border-amber-900/10">
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Dân vận không chỉ là tuyên truyền mà còn là tổ chức, lắng
                    nghe và phản hồi kịp thời lợi ích chính đáng của nhân dân.
                    Cán bộ dân vận cần "gần dân, trọng dân, hiểu dân, học dân" để xây dựng niềm tin sắt đá.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-xs text-neutral-500 space-y-1">
                    <li>Xây dựng cơ chế đối thoại định kỳ giữa chính quyền và người dân.</li>
                    <li>Phát huy vai trò giám sát, phản biện xã hội của Mặt trận Tổ quốc.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  aria-expanded={open1}
                  onClick={() => setOpen1((v) => !v)}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow transition cursor-pointer"
                >
                  {open1 ? 'Thu gọn' : 'Xem chi tiết'}
                </button>
              </div>
            </div>

            {/* Phần 2 */}
            <div
              ref={sec3.ref}
              className={`gold-glow-panel rounded-2xl p-6 border border-amber-900/30 bg-[#161722]/85 shadow-2xl transition-all duration-700 ease-out transform ${sec3.inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
                } hover:shadow-3xl`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4 font-heading">
                Mỗi tầng lớp đều có tổ chức đại diện
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: 'Công nhân',
                    org: 'Công đoàn',
                    color: 'bg-red-500'
                  },
                  {
                    name: 'Thanh niên',
                    org: 'Đoàn Thanh niên',
                    color: 'bg-yellow-500'
                  },
                  {
                    name: 'Phụ nữ',
                    org: 'Hội Liên hiệp Phụ nữ',
                    color: 'bg-pink-500'
                  },
                  {
                    name: 'Nông dân',
                    org: 'Hội Nông dân',
                    color: 'bg-amber-500'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-black/40 p-3.5 rounded-xl border border-amber-950/20 shadow-md transition-all hover:border-amber-500/20"
                  >
                    <div className="flex items-center space-x-2.5 text-sm">
                      <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                      <span className="font-semibold text-neutral-200">
                        {item.name}
                      </span>
                      <span className="text-neutral-500">→</span>
                      <span className="text-amber-400 font-medium">
                        {item.org}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-neutral-400 italic">
                <strong>Mục đích:</strong> Tập hợp gắn kết mọi tầng lớp đa dạng vào khối đoàn kết chung thống nhất.
              </p>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${open2
                  ? 'max-h-[1000px] opacity-100 mt-4'
                  : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="bg-black/30 rounded-xl p-4 border border-amber-900/10">
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Ngoài các tầng lớp cơ bản, cần mở rộng mặt trận đoàn kết tới
                    các trí thức, doanh nhân, kiều bào ở nước ngoài, bảo đảm
                    mọi người Việt yêu nước đều có một tiếng nói.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  aria-expanded={open2}
                  onClick={() => setOpen2((v) => !v)}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow transition cursor-pointer"
                >
                  {open2 ? 'Thu gọn' : 'Xem chi tiết'}
                </button>
              </div>
            </div>

            {/* Phần 3 */}
            <div
              ref={sec4.ref}
              className={`gold-glow-panel rounded-2xl p-6 border border-amber-900/30 bg-[#161722]/85 shadow-2xl transition-all duration-700 ease-out transform ${sec4.inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
                } hover:shadow-3xl`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-3 font-heading">
                Quy tụ các đoàn thể vào Mặt trận dân tộc thống nhất
              </h2>
              <p className="text-base text-neutral-300 mb-4 leading-relaxed">
                Đây là bước phát triển cao nhất: các đoàn thể cùng quy tụ về một
                <span className="font-bold text-amber-300">
                  {' '}
                  “ngôi nhà chung”
                </span>{' '}
                để hiệp thương thống nhất hành động.
              </p>
              <div className="bg-[#0d0e12]/60 p-4 rounded-xl border border-amber-900/10 mb-4">
                <p className="text-sm text-neutral-300">
                  <strong>Kết quả:</strong> Loại bỏ chia rẽ, kết hợp năng lực hành động đơn lẻ thành sức mạnh tổng hợp vô địch của toàn dân tộc.
                </p>
              </div>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${open3
                  ? 'max-h-[1000px] opacity-100 mt-4'
                  : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="bg-black/30 rounded-xl p-4 border border-amber-900/10">
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                    Hồ Chí Minh chỉ rõ:
                    <span className="italic text-amber-500 block mt-1">
                      "Mặt trận dân tộc thống nhất vẫn là một trong những lực lượng to lớn của cách mạng Việt Nam... Phải đoàn kết tốt các đảng phái, các đoàn thể, các nhân sĩ trong Mặt trận Tổ quốc Việt Nam, thực hiện hợp tác lâu dài, giúp đỡ lẫn nhau, cùng nhau tiến bộ..."
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  aria-expanded={open3}
                  onClick={() => setOpen3((v) => !v)}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow transition cursor-pointer"
                >
                  {open3 ? 'Thu gọn' : 'Xem chi tiết'}
                </button>
              </div>
            </div>

            {/* Phần 4 - Ý nghĩa */}
            <div
              ref={sec5.ref}
              className={`crimson-glow-panel rounded-2xl p-6 border border-red-900/30 text-center shadow-2xl transition-all duration-700 ease-out transform ${sec5.inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
                } hover:shadow-3xl`}
            >
              <h3 className="text-lg md:text-xl font-bold text-red-400 mb-2 font-heading">
                Ý nghĩa của đại đoàn kết dân tộc
              </h3>
              <p className="text-neutral-300 text-base leading-relaxed">
                Đại đoàn kết dân tộc là sức mạnh nội sinh khổng lồ, là động lực cơ bản quyết định thành bại để bảo vệ và phát triển đất nước bền vững trong thời đại mới.
              </p>
            </div>

            {/* Kết luận */}
            <div className="gold-glow-panel rounded-2xl p-8 border border-amber-900/30 bg-[#12131a]/85 shadow-2xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-amber-500 font-heading">
                KẾT LUẬN CHUYÊN ĐỀ
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
                <p className="text-center">
                  <span className="font-semibold text-amber-400">
                    Đại đoàn kết toàn dân tộc
                  </span>{' '}
                  là chiến lược cách mạng cơ bản, xuyên suốt và lâu dài trong tư tưởng
                  <span className="font-bold text-red-400"> Hồ Chí Minh</span>.
                </p>
                <p className="text-center">
                  Đây là{' '}
                  <span className="font-bold text-amber-400">
                    cội nguồn sức mạnh vô địch
                  </span>
                  , quyết định mọi thắng lợi của cách mạng Việt Nam.
                </p>
                <p className="text-center">
                  Hồ Chí Minh khẳng định: đoàn kết vừa là mục tiêu, vừa là động lực, là then chốt của thành công.
                </p>

                <div className="bg-[#0d0e12]/60 rounded-xl p-4 border border-amber-900/20 mt-4 text-center">
                  <p className="text-xs text-amber-400/90 font-medium">
                    Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
