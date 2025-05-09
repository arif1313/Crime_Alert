
const Connection = () => {
  return (
    //  <div >
    
    //  <Reports2></Reports2>
    
    // </div>
    <div className="w-full lg:w-2/4  p-2 ">
            {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
        <li key={i} */}
       <ul className="list  rounded-box shadow-md gap-2">
        
  
  <li className="p-4 pb-2   tracking-wide shadow-2xl text-2xl text-black">Your Connected people </li>
  {[1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15].map((_, i) => (
        <li key={i} className="list-row border-b bg-red-100">
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
    <div>
      <div className="text-red-950 font-bold">Dio Lupa</div>
      <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
    </div>
   {/* <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
    </button> */}
    <button className="btn btn-square btn-ghost bg-red-400 hover:bg-red-800">
        +
      {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg> */}
    </button>
  </li>
  ))}
</ul>
    </div>
  )
}

export default Connection