// LinkedIn-like Home Page using React + Tailwind CSS (No shadcn/ui)


const Sidebar = () => (
  <div className="w-full lg:w-1/4 p-2 space-y-4">

<div className=" shadow-md bg-gradient-to-r from-[lightPink] to-[#f9cfcf] p-6 rounded-xl">
      <h3 className="font-semibold mb-2">Suggested for you</h3>
      <ul className="text-sm text-[#cb3737] space-y-1">
        <li>Follow Web Dev</li>
        <li>Trending in Tech</li>
      </ul>
    </div>
  {/* <div className="bg-white shadow-md rounded-xl p-4 text-center">
    <img
      src="https://placehold.co/100x100"
      alt="Profile"
      className="mx-auto rounded-full mb-2"
    />
    <h2 className="font-bold">John Doe</h2>
    <p className="text-sm text-gray-500">Web Developer</p>
    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">View Profile</button>
  </div>

  <div className="bg-white shadow-md rounded-xl p-4">
    <h3 className="font-semibold mb-2">Connections</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>Jane Smith</li>
      <li>Mike Johnson</li>
      <li>Emily Brown</li>
    </ul>
  </div> */}
</div>
);

const Feed = () => (
  <div className="w-full lg:w-2/4 p-2 ">
    <div className="bg-gradient-to-b from-[lightPink]   shadow-md rounded-xl p-4 mb-4">
      <textarea
        placeholder="Start a post..."
        className="w-full border border-[#eb7e7e] rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#cb3737]"
      ></textarea>
      <button className="mt-2 bg-[#cb3737] text-white py-2 px-4 rounded-lg hover:bg-[#cb3737] transition">Post</button>
    </div>

    {[1, 2, 3,4,5,6,7,8].map((_, i) => (
      <div key={i} className=" bg-gradient-to-b from-[lightPink]   shadow-md rounded-xl text-[#3f1010]  mb-4">
        <div className="flex items-center space-x-3 p-3 mb-5">
          <img
            src="https://placehold.co/50x50"
            alt="Avatar"
            className="rounded-full"
          />
          <div>
            <h4 className="font-semibold">Jane Smith</h4>
            <p className="text-sm">Software Engineer</p>
          </div>

        </div>
        <div className="  flex flex-col ">
      <div className=" flex flex-col lg:flex-row w-full ">
        <img
          src="https://th.bing.com/th/id/OIP.6mh5zE9cKxsGCxYGSQK7nAHaE8?w=612&h=408&rs=1&pid=ImgDetMain"
          className="w-full lg:w-72 h-72  shadow-2xl" />
        <div className="p-5 border-t-2 border-b-2 border-[#8d2727]">
          <h1 className="text-2xl font-bold ">Spot 2 murder in musque </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>

        </div>


      </div>
      <div className="flex justify-between gap-5 w-full p-5">
        <div className="flex gap-6">
          <div>
          <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">save</button>
          </div>
          <div>
          <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">varify</button>
          </div>
          <div>
          <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">Alert</button>
          </div>
          <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">Help</button>
        </div>
        <div>
        <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">see more</button>
        </div>
      </div>


    </div>
      </div>
    ))}
  </div>
);

const RightPanel = () => (
  <div className="w-full lg:w-1/4 p-2 space-y-4">
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="font-semibold mb-2">Suggested for you</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Follow Web Dev</li>
        <li>Trending in Tech</li>
      </ul>
    </div>
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="font-semibold mb-2">Ads</h3>
      <p className="text-sm text-gray-500">Get hired by top companies!</p>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        <Sidebar />
        <Feed />
        <RightPanel />
      </div>
    </div>
  );
};

export default HomePage;