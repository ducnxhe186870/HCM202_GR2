import { Link } from "react-router";
import GithubIcon from "../assets/Octicons-mark-github.svg?react"
import { useVTNavigate } from "../hooks/useVTNavigate";
import ShortUrl from "./ShortUrl";

export default function NavBar() {
  const vtNavigate = useVTNavigate();

  function handleInternalNav(e: React.MouseEvent, to: string) {
    e.preventDefault();
    vtNavigate(to);
  };

  // Simple preload function for hover
  function handleMouseEnter(route: string) {
    // Preload the route component on hover
    switch (route) {
      case '/':
        import('../pages/Home');
        break;
      case '/quiz':
        import('../pages/Quiz');
        break;
      case '/q&a':
        import('../pages/QandA');
        break;
      case '/members':
        import('../pages/Member');
        break;
      case '/overview':
        import('../pages/Overview');
        break;
      case '/sources':
        import('../pages/Source');
        break;
      case '/part3':
        import('../components/Part3/Part3Detail');
        break;
      case '/flashcard-study':
        import('../pages/FlashCardStudy');
        break;
      case '/flashcard-test':
        import('../pages/FlashCardStudySimple');
        break;
    }
  };

  return (
    <nav
      className="group fixed top-2 grid grid-cols-2 left-1/2 -translate-x-1/2 w-[calc(100%-12rem)] 
    bg-gray-500/10 hover:bg-gray-100/90 hover:shadow-2xl px-8 py-1 rounded-4xl transition-colors duration-100 z-50"
    >
      <div className="flex gap-4 items-center justify-self-start">
        <ShortUrl />
        <Link
          to="/"
          onClick={(e) => handleInternalNav(e, "/")}
          onMouseEnter={() => handleMouseEnter("/")}
        >
          <h1 className="text-xl font-semibold text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100">
            Đại Đoàn Kết
          </h1>
        </Link>
      </div>


      <div className="flex gap-8 items-center justify-self-end">
        <Link
          to="/quiz"
          onClick={(e) => handleInternalNav(e, "/quiz")}
          onMouseEnter={() => handleMouseEnter("/quiz")}
        >
          <p className="font-semibold text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100">
            Quiz
          </p>
        </Link>

        <Link
          to="/q&a"
          onClick={(e) => handleInternalNav(e, "/q&a")}
          onMouseEnter={() => handleMouseEnter("/q&a")}
        >
          <p className="font-semibold text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100">
            Hỏi Đáp
          </p>
        </Link>

        <Link
          to="/members"
          onClick={(e) => handleInternalNav(e, "/members")}
          onMouseEnter={() => handleMouseEnter("/members")}
        >
          <p className="font-semibold text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100">
            Thành viên
          </p>
        </Link>

        {/* <Link to="/sources" onClick={(e) => handleInternalNav(e, "/sources")}>
          <p className="font-semibold text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100">
            Nguồn
          </p>
        </Link> */}

        <Link
          to="/overview"
          onClick={(e) => handleInternalNav(e, "/overview")}
          onMouseEnter={() => handleMouseEnter("/overview")}
        >
          <p className="font-semibold text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100">
            Tổng quan dự án
          </p>
        </Link>

        <Link
          to="https://github.com/PTPhongKMF/hcm202-daidoanket-sucmanhdantocvietnam-web"
          target="_blank"
        >
          <GithubIcon className="size-7 text-black/10 group-hover:text-black hover:text-red-700 transition-colors duration-100" />
        </Link>
      </div>
    </nav>
  );
}
