import { Link } from 'react-router'

export default function TopBar() {
  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">Đ</div>
          <div>
            <div className="text-sm font-semibold">Hợp Lực</div>
            <div className="text-xs text-gray-500">Kết nối giá trị</div>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-emerald-600">Trang chủ</Link>
          <Link to="/overview" className="text-gray-700 hover:text-emerald-600">Tổng quan</Link>
          {/* <Link to="/sources" className="text-gray-700 hover:text-emerald-600">Tài liệu</Link> */}
        </nav>
      </div>
    </header>
  )
}
