import profilepic from '../../../public/profile.jpg'
import { NavLink, Outlet } from 'react-router-dom'

const Profile = () => {
  return (

    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 p-2 space-y-4 fixed">
          <div className="bg-gradient-to-b from-[lightPink]  shadow-md rounded-xl p-4 text-center">
            <img
              src={profilepic}
              alt="Profile"
              className=" w-24 h-24 mx-auto rounded-full mb-2"
            />
            <h2 className="font-bold">John Doe</h2>
            <p className="text-sm text-gray-500">Student</p>
            <button className="mt-4 w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-700 transition">View Profile</button>
          </div>

          <div className="bg-gradient-to-b from-[lightPink] shadow-md rounded-xl p-4">
            <h3 className="font-bold text-xl mb-2 ">Reports Analysis</h3>
            <ul className="menu  rounded-box w-56 font-bold text-red-800">
              <li><NavLink>Your Reports</NavLink></li>
              <li><NavLink>Analysis</NavLink></li>
              <li><NavLink>Earning</NavLink></li>



            </ul>

          </div>
        </div>
        <div className="w-full lg:w-1/4 p-2 space-y-4 ">
        </div>

        <Outlet></Outlet>


        {/*  */}
      </div>
    </div>

  )
}

export default Profile;
