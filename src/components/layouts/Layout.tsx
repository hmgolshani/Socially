import { Outlet, useLocation } from "react-router";
import Header from "@/components/layouts/Header.tsx";
import SideProfileCard from "@/components/cards/SideProfileCard.tsx";
import SideSignInCard from "@/components/cards/SideSignInCard.tsx";
import RecommendedUserCard from "@/components/cards/recommendedCard/RecommendedUserCard.tsx";

const Layout = () => {
  // Delete later :
  const isAuthenticated = false;

  const currentUser = {
    name: "Seyed Ali Mousavi",
    username: "samb.1376",
    followers: 0,
    following: 0,
  };
  // Delete later

  const {pathname} = useLocation();
  const isNotificationsPage = pathname === "/notifications";

  return (
    <div>
      <Header />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 px-4 py-4 md:grid-cols-[180px_minmax(0,1fr)_180px] lg:grid-cols-[220px_minmax(0,1fr)_320px]">
        <aside className="hidden md:block">
          <div className="sticky">
            {isAuthenticated ? (
              <SideProfileCard user={currentUser} />
            ) : (
              <SideSignInCard />
            )}
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>

        <aside className="hidden md:block">
          <div className="sticky">
            {!isNotificationsPage && <RecommendedUserCard />}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;