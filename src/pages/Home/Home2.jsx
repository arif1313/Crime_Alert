// LinkedIn-like Home Page using React + Tailwind CSS (No shadcn/ui)




import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import { Outlet } from "react-router-dom";





const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        <Sidebar />
        <Outlet></Outlet>
       
        <RightPanel/>
      </div>
    </div>
  );
};

export default HomePage;