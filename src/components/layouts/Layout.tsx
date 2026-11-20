import { Outlet } from "react-router";
import Header from "@/components/layouts/Header.tsx";

const Layout = () => {
  return (
    <div>

      <Header/>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 px-4 py-4 md:grid-cols-[180px_minmax(0,1fr)_180px] lg:grid-cols-[220px_minmax(0,1fr)_220px]">
        <aside className="hidden  md:block">
          <div className="sticky top-20">
            {/*SideProfileCard یا SideSignInCard*/}
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>

        <aside className="hidden md:block">
          <div className="sticky top-20">
            {/* Who to Follow */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
