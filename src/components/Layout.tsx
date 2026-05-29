import { Outlet } from 'react-router';
import NavigationDock from './NavigationDock';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6E3] text-stone-800">
      <main id="view-root" className="view-page flex-1 max-w-[100svw] pb-24 overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />
      <NavigationDock />
    </div>
  )
}
