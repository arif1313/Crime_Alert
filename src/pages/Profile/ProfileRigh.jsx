import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileRigh = ({role='localPolice'}) => (
  <div className="w-full  p-2 space-y-4 ">

<div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 lg:min-h-screen w-full">
 <div className="fixed">
     <h3 className="font-bold  mb-2">Reports Analysis</h3>
  <ul className="menu rounded-box w-full font-bold text-red-800 ">
{role=="localUser" && <>  <li>
      <NavLink to="/profile/aboutme" className="border-b-2 w-34">
        Your Profile
      </NavLink>
    </li>
     <li>
      <NavLink to="/profile/myReport" className="border-b-2 w-34">
        My Report
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/analysis" className="border-b-2 w-34">
        Analysis
      </NavLink>
    </li>
      
    <li>
      <NavLink to="/profile/deleted" className="border-b-2 w-34">
        Deleted reports
      </NavLink>
    </li>
    </>}
    {role=="localPolice" && <>  <li>
      <NavLink to="/profile/reports" className="border-b-2 w-34">
        Manage Reports
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/action" className="border-b-2 w-34">
        Action report
      </NavLink>
    </li>
    <li>
      <NavLink to="/profile/userMange" className="border-b-2 w-34">
        Manage user
      </NavLink>
      <NavLink to="/profile/areaReport" className="border-b-2 w-34">
       Report Overview
      </NavLink>
      <NavLink to="" className="border-b-2 w-34">
        Deleted User
      </NavLink>
     
       <NavLink to="/profile/ActionTeam/create" className="border-b-2 w-34">
       Create team
      </NavLink>
       <NavLink to="/profile/Manage/ActionTeam" className="border-b-2 w-34">
       ActionTeam
      </NavLink>

    </li>
    </>}
      
    {role=="centerPolice" && <>  <li>
      <NavLink to="/profile" className="border-b-2 w-34">
        Manage local Police
      </NavLink>
    </li>
    <li>
      <NavLink to="" className="border-b-2 w-34">
       Manage Local police 
      </NavLink>
    </li>
    <li>
      <NavLink to="" className="border-b-2 w-34">
        Local police contacts
      </NavLink>
      <NavLink to="" className="border-b-2 w-34">
        Deleted Local Police
      </NavLink>
      <NavLink to="" className="border-b-2 w-34">
        Blocked Local police
      </NavLink>
       <NavLink to="" className="border-b-2 w-34">
       create Police Sation
      </NavLink>

    </li>
    </>}
    {role=="actionTeam" && <>  <li>
      <NavLink to="/profile" className="border-b-2 w-34">
        YourTask
      </NavLink>
    </li>
    <li>
      <NavLink to="" className="border-b-2 w-34">
       TotalTask 
      </NavLink>
    </li>
    </>}
  </ul>
 </div>
</div>

    </div>

);
ProfileRigh.propTypes = {
  role: PropTypes.string.isRequired, // ✅ add props validation
};
export default ProfileRigh;