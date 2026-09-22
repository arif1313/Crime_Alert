import { Outlet } from "react-router-dom";
import ProfileRigh from "./ProfileRigh";
import { useAuth } from "../Auth/AuthContext";

const ProfileMain = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#08080d] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside>
          <ProfileRigh role={user?.role} />
        </aside>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0b0b12]">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ProfileMain;
