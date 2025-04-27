import { BiPhoneCall } from "react-icons/bi";

const RightPanel = () => (
  <div className="w-full lg:w-1/4  p-2 space-y-4 ">

    <div className="bg-white shadow-md rounded-xl p-4  ">
      <h2 className="font-bold p-3 text-xl"> News in your area</h2>
      <div className="flex rounded-md shadow-xl">

        <div className="bg-red-600 w-2 rounded-l-md">

        </div>
        <div className="bg-red-200 flex-1 rounded-r-md p-3 text-red-900">
          <h3 className="font-semibold  mb-2">A murder in your area</h3>
          <ul className="text-sm text-red-900 space-y-1">

            <li>Time: 3 pm </li>
          </ul>
        </div>
      </div>

    </div>
 
      <div className=" rounded-xl p-4 shadow-2xl bg-red-200">
       
        <h3 className="font-semibold mb-2">possible a crime</h3>
        <p className="text-sm text-gray-500">dont go to outsite of area</p>
      
      </div>
      <div className="bg-red-200  rounded-xl p-4 shadow-2xl ">
       
       <h3 className="font-semibold mb-2">Alert</h3>
       <p className="text-sm text-gray-500">thif team in this area</p>
     
     </div>
     <div className="bg-red-200  rounded-xl p-4 shadow-2xl">
       
       <h3 className="font-semibold mb-2">Alert</h3>
       <p className="text-sm text-gray-500">Dont move in midnight</p>
     
     </div>
     <div className="bg-red-200  rounded-xl p-4 shadow-2xl">
       
       <h3 className="font-semibold mb-2">Emargency call</h3>
       <ul className="list bg-base-100 rounded-box shadow-md">
  

  
  <li className="p-4 flex justify-between font-bold text-red-800">
  {/* logo */} 
    {/* <div>
    
      {/* <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/> */}
      
      {/* </div> */}
    <div>
      <div>Local police</div>
      <div className="text-xs uppercase font-semibold opacity-60">0175682565</div>
    </div>
  
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  
  <li className="p-4 flex justify-between font-bold  text-red-800">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div> */}
    <div>
      <div>Ambulance</div>
      <div className="text-xs uppercase font-semibold opacity-60">5681284</div>
    </div>
   
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
     </button>
  </li>
  
  <li className="p-4 flex justify-between font-bold text-red-800 ">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div> */}
    <div>
      <div>FireFighter</div>
      <div className="text-xs uppercase font-semibold opacity-60">36584281</div>
    </div>
   
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  <li className="p-4 flex justify-between font-bold text-red-800 ">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div> */}
    <div>
      <div>Doctore</div>
      <div className="text-xs uppercase font-semibold opacity-60">987568</div>
    </div>
   
    <button className="btn btn-square btn-ghost">

    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  <li className="p-4 flex justify-between font-bold text-red-800 ">
    {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div> */}
    <div>
      <div>Emargency</div>
      <div className="text-xs uppercase font-semibold opacity-60">999</div>
    </div>
   
    <button className="btn btn-square btn-ghost">
    <BiPhoneCall  className="text-red-900"></BiPhoneCall>
    </button>
  </li>
  
</ul>
     </div>

    </div>

);
export default RightPanel;