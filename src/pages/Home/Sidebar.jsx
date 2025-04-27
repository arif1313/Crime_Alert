import Searchmap from "./CrimeHeatmap/Searchmap";

const Sidebar = () => (
    <div className="w-full lg:w-1/4  ">
  
  
  
      <div className=" shadow-md bg-[#fff0f0] text-red-800 p-6 rounded-xl">
        <div>
          <h3 className="font-semibold mb-2">Select Area </h3>
          {/* search option */}
  
          <div>
            <Searchmap></Searchmap>
  
          </div>
        </div>
  
  
      </div>
  
      {/* <div className="bg-white shadow-md rounded-xl p-4  text-center">
      <img
        src="https://placehold.co/100x100"
        alt="Profile"
        className="mx-auto rounded-full mb-2"
      />
      <h2 className="font-bold">John Doe</h2>
      <p className="text-sm text-gray-500">Web Developer</p>
      <button className="mt-4  w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">View Profile</button>
    </div>
  
    <div className="bg-white shadow-md rounded-xl p-4 ">
      <h3 className="font-semibold mb-2">Connections</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Jane Smith</li>
        <li>Mike Johnson</li>
        <li>Emily Brown</li>
      </ul>
    </div> */}
    </div>
  
  );

  export default Sidebar;