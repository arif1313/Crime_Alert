
import Reports2 from '../Reports/Reports2'

const SubProfile = () => {
  return (
    <> 
    
       <div className="w-full lg:w-2/4  p-2 ml-0 lg:ml-3 ">
    <Reports2></Reports2>
 
    </div>
    <div className="w-full lg:w-1/4  p-2 ">
    
    <div className="w-full lg:w-1/4 p-2 space-y-4 fixed">
          <div className="bg-gradient-to-b from-[lightPink]  shadow-md rounded-xl p-4 text-center">
            
            <h2 className="font-bold">John Doe</h2>
            <p className="text-sm text-gray-500">Student</p>
            <button className="mt-4 w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-700 transition">View Profile</button>
          </div>

          <div className="bg-gradient-to-b from-[lightPink] shadow-md rounded-xl p-4">
            <h3 className="font-bold text-xl mb-2 ">Reports Analysis</h3>
            <ul className="menu  rounded-box w-56 font-bold text-red-800">
              



            </ul>

          </div>
        </div>
    </div>
     
    
    
    </>
  )
}

export default SubProfile