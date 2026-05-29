import { Outlet } from 'react-router';
import NavigationDock from './NavigationDock';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d0e12] text-neutral-100">
      <main id="view-root" className="view-page flex-1 max-w-[100svw] pb-28 overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />
      <NavigationDock />
    </div>
  )
}
