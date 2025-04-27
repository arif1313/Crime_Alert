import Reports2 from "../Reports/Reports2";

const Feed = () => (
    <div className="w-full lg:w-2/4  p-2 ">
      <div className="bg-gradient-to-b from-[lightPink]   shadow-md rounded-xl p-4  mb-4 ">
        <textarea
          placeholder="Start a post..."
          className="w-full border text-red-950 border-[#eb7e7e] rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#cb3737]"
        ></textarea>
        <button className="mt-2 bg-[#cb3737] text-white py-2 px-4  rounded-lg hover:bg-[#cb3737] transition">Post</button>
      </div>
     <Reports2></Reports2>
    
    </div>
  );
  export default Feed;