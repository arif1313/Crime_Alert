import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileRigh = ({ role = "localPolice" }) => (
  <div className="w-full">
    <div className="rounded-2xl border border-white/5 bg-[#0b0b12] p-4 shadow-xl">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">Workspace</p>
      <h3 className="mb-5 text-lg font-bold text-white">Profile tools</h3>
      <ul className="space-y-1 text-sm font-medium text-gray-400">
{role=="localUser" && <>  <li>
      <NavLink to="/profile/aboutme" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Your Profile
      </NavLink>
    </li>
     <li>
      <NavLink to="/profile/myReport" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        My Report
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/analysis" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Analysis
      </NavLink>
    </li>
      
    <li>
      <NavLink to="/profile/deleted" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Deleted reports
      </NavLink>
    </li>
    </>}
    {role=="localPolice" && <>  <li>
      <NavLink to="/profile/reports" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Manage Reports
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/action" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Action report
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/userMange" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Manage user
      </NavLink>
      <NavLink to="/profile/areaReport" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
       Report Overview
      </NavLink>
      <NavLink to="" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Deleted User
      </NavLink>
     
      <NavLink to="/profile/ActionTeam/create" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
       Create team
      </NavLink>
      <NavLink to="/profile/Manage/ActionTeam" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
       ActionTeam
      </NavLink>

    </li>
    </>}
      
    {role=="centerPolice" && <>  <li>
      <NavLink to="/profile" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Manage local Police
      </NavLink>
    </li>
    <li>
      <NavLink to="" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
       Manage Local police 
      </NavLink>
    </li>
    <li>
      <NavLink to="" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Local police contacts
      </NavLink>
      <NavLink to="" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        Deleted Local Police
      </NavLink>
      <NavLink to="" className="border-b-2 w-34">
        Blocked Local police
      </NavLink>
      <NavLink to="" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
       create Police Sation
      </NavLink>

    </li>
    </>}
    {role=="actionTeam" && <>  <li>
      <NavLink to="/profile" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
        YourTask
      </NavLink>
    </li>
    <li>
      <NavLink to="" className="block rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
       TotalTask 
      </NavLink>
    </li>
    </>}
        </ul>
      </div>
    </div>

);
ProfileRigh.propTypes = {
  role: PropTypes.string.isRequired, // ✅ add props validation
};
export default ProfileRigh;