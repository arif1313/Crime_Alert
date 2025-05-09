// eslint-disable-next-line react/prop-types
const Reports2 = ({ manageMode = false }) => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
        <div key={i} className="bg-gradient-to-b from-[lightPink] shadow-md rounded-xl text-[#3f1010] mb-4">
          <div className="flex items-center space-x-3 p-3 mb-5">
            <img src="https://placehold.co/50x50" alt="Avatar" className="rounded-full" />
            <div>
              <h4 className="font-semibold">Jane Smith</h4>
              <p className="text-sm">Software Engineer</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row w-full">
              <img
                src="https://th.bing.com/th/id/OIP.6mh5zE9cKxsGCxYGSQK7nAHaE8?w=612&h=408&rs=1&pid=ImgDetMain"
                className="w-full lg:w-72 h-72 shadow-2xl"
              />
              <div className="p-5 border-t-2 border-b-2 border-[#8d2727]">
                <h1 className="text-2xl font-bold">Spot 2 murder in mosque</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                  quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-5 w-full p-5">
              <div className="flex gap-6">
                <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">save</button>
                <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">verify</button>
                <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">alert</button>
                <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">help</button>
              </div>

              <div className="flex gap-2">
                {manageMode && (
                  <>
                    <button className="btn btn-xs bg-yellow-300 text-black">Edit</button>
                    <button className="btn btn-xs bg-red-500 text-white">Delete</button>
                  </>
                )}
                <button className="btn btn-xs bg-[#ffe1e2] border-[#fc6d74] text-[#47080b]">See more</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Reports2;
