

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
       
      
     </div>

    </div>

);
export default RightPanel;