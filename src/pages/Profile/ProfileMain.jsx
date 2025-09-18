import { Outlet, useLocation } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileRigh from "./ProfileRigh";
import { useAuth } from "../Auth/AuthContext";

const ProfileMain = () => {
  const { user } = useAuth();
  const location = useLocation();

//   // Sidebar hide when route is /profile or /profile/deleted
//   const hideSidebarRoutes = ["/profile", "/profile/deleted"];
//   const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        
        {/* Left Sidebar */}
        
          <div className="lg:w-1/4">
            <ProfileSidebar userId={user?._id} />
          </div>
       

        {/* Main Outlet */}
        <div className="w-full p-4" >
          <Outlet />
        </div>

        {/* Right Sidebar (always visible) */}
        <div className="lg:w-1/4">
          <ProfileRigh role={user?.role} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
