// LinkedIn-like Home Page using React + Tailwind CSS (No shadcn/ui)

import { BiPhoneCall } from "react-icons/bi";

import Feed from "./Feed";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";





const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        <Sidebar />
        <Feed />
        <RightPanel/>
      </div>
    </div>
  );
};

export default HomePage;