



const FeedbackCard = () => {
  return (
    <div className="card card-compact bg-red-100 w-96 shadow-xl border-2 border-red-400">
        <div className="card-body">
   
    <p className='font-bold'>&quot; If a dog chews shoes whose shoes does he choose &quot;</p>
    
  </div>
   <div className='flex gap-8 px-10 items-center pb-5 '>
   <div className="avatar indicator">
 
 <div className="h-20 w-20 rounded-full ">
   <img
     alt="Tailwind CSS examples"
     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
 </div>
</div>
<div>
    <h1>Name</h1>
    <div className="rating rating-xs">
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input
    type="radio"
    name="rating-5"
    className="mask mask-star-2 bg-orange-400"
     />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
</div>
</div>
   </div>
  
</div>
  )
}

export default FeedbackCard