import { useState } from 'react'
import profilepic from '../../../public/profile.jpg'
import { NavLink, Outlet } from 'react-router-dom'
import { Pencil } from 'lucide-react' // icon package, optional

const Profile = () => {
  const [isEditing, setIsEditing] = useState({
    image: false,
    contact: false,
    email: false,
    location: false,
    dob: false
  })

  const [profile, setProfile] = useState({
    image: profilepic,
    contact: "01757072839",
    email: "aljroj@ljsl",
    location: "Dhaka, Bangladesh",
    dob: "29 Feb 2000"
  })

  const handleEditToggle = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-1/4 p-2 space-y-4 lg:fixed ">
          {/* Profile Card */}
          <div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 text-center lg:min-h-screen">
            {isEditing.image ? (
              <input
                type="file"
                onChange={(e) => {
                  const file = URL.createObjectURL(e.target.files[0])
                  setProfile(prev => ({ ...prev, image: file }))
                  handleEditToggle('image')
                }}
              />
            ) : (
              <>
                <img src={profile.image} alt="Profile" className="w-24 h-24 mx-auto rounded-full mb-2" />
                <button onClick={() => handleEditToggle('image')}>
                  <Pencil size={16} />
                </button>
              </>
            )}
            <h2 className="font-bold">John Doe</h2>
            <p className="text-sm text-gray-500">Student</p>
            <div className="space-y-2">
            <h1 className="font-bold text-lg">Information</h1>

            <div className="flex justify-between items-center">
              {isEditing.contact ? (
                <input name="contact" value={profile.contact} onChange={handleChange} onBlur={() => handleEditToggle('contact')} />
              ) : (
                <p>Contact: {profile.contact}</p>
              )}
              <button onClick={() => handleEditToggle('contact')}><Pencil size={16} /></button>
            </div>

            <div className="flex justify-between items-center">
              {isEditing.email ? (
                <input name="email" value={profile.email} onChange={handleChange} onBlur={() => handleEditToggle('email')} />
              ) : (
                <p>Email: {profile.email}</p>
              )}
              <button onClick={() => handleEditToggle('email')}><Pencil size={16} /></button>
            </div>

            <div className="flex justify-between items-center">
              {isEditing.location ? (
                <input name="location" value={profile.location} onChange={handleChange} onBlur={() => handleEditToggle('location')} />
              ) : (
                <p>Location: {profile.location}</p>
              )}
              <button onClick={() => handleEditToggle('location')}><Pencil size={16} /></button>
            </div>

            <div className="flex justify-between items-center">
              {isEditing.dob ? (
                <input name="dob" value={profile.dob} onChange={handleChange} onBlur={() => handleEditToggle('dob')} />
              ) : (
                <p>Date of Birth: {profile.dob}</p>
              )}
              <button onClick={() => handleEditToggle('dob')}><Pencil size={16} /></button>
            </div>
          </div>
          </div>

          {/* Info Section */}
       
        </div>

        {/* SPACER */}
        <div className="w-full lg:w-1/4 p-2 space-y-4"></div>

        {/* CENTER OUTLET */}
        <div className="w-full lg:w-2/4  p-2 ml-0 lg:ml-3 ">

        <Outlet />
        </div>

        {/* RIGHT REPORT SECTION */}
        <div className="w-full lg:w-1/4 p-2 lg:fixed  right-0">
          <div className="bg-gradient-to-b from-pink-200 shadow-md rounded-xl p-4 lg:min-h-screen">
            <h3 className="font-bold text-xl mb-2">Reports Analysis</h3>
            <ul className="menu rounded-box w-56 font-bold text-red-800 ">
              <li><NavLink className="border-b-2 ">Your Reports</NavLink></li>
              <li><NavLink to='/profile/analysis' className="border-b-2 ">Analysis</NavLink></li>
              <li><NavLink className="border-b-2 ">Earning</NavLink></li>
              <li><NavLink to='/profile/manage' className="border-b-2 ">Manage Report</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
