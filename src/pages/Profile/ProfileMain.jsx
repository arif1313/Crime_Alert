import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileRigh from "./ProfileRigh";
import { useAuth } from "../Auth/AuthContext";

const ProfileMain = () => {
  const { user } = useAuth();
 

//   // Sidebar hide when route is /profile or /profile/deleted
//   const hideSidebarRoutes = ["/profile", "/profile/deleted"];
//   const hideSidebar = hideSidebarRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen bg-[#08080d] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 xl:grid-cols-[270px_minmax(0,1fr)_250px]">
        <div>
          <ProfileSidebar userId={user?._id} />
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0b0b12]">
          <Outlet />
        </div>

        <div>
          <ProfileRigh role={user?.role} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
