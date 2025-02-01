import pic1 from '../../../assets/home/pics/1.jpeg'
// grid w-full place-items-start  bg-center bg-cover bg-no-repeat
function Banar() {
  return (
    <div>
       <div
  className="hero  min-h-screen"
  style={{
    backgroundImage: `url(${pic1})`,
  }}>
  <div className="hero-overlay  bg-opacity-60"></div>
  <div className=" text-neutral-content text-center ">
    <div className=" px-36">
    <h1 className="mb-5 text-5xl font-bold  ">Stay <span className="text-green-500">Safe</span>, Stay <span className="text-red-500">Alert</span> </h1>
    
      <p className="mb-5 aa ">
       Report crime anonymously and get realtime crime alerts  in your own area.
      </p>
      <button className="btn bg-red-600  border-red-600 shadow-none text-black">Report</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Banar