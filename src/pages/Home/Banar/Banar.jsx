import pic1 from '../../../assets/home/pics/bd.jpg'

function Banar() {
  return (
    <div>
       <div
  className="hero min-h-screen"
  style={{
    backgroundImage: `url(${pic1})`,
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold  aa  -space-y-1.5">Stay Save, </h1>
      <h1 className="mb-5 text-5xl font-bold pl-36 aa -space-y-1.5">Stay Alert</h1>
      <p className="mb-5 aa ">
       Report crime anonymously and get realtime crime alerts  in your own area.
      </p>
      <button className="btn btn-primary">Report</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Banar