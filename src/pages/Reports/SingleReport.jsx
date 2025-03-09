

const SingleReport = () => {
  return (
    <div className="hero  flex flex-col  shadow-2xl">
      <div className=" flex flex-col lg:flex-row  bg-base-200">
        <img
          src="https://th.bing.com/th/id/OIP.6mh5zE9cKxsGCxYGSQK7nAHaE8?w=612&h=408&rs=1&pid=ImgDetMain"
          className="w-full lg:w-72 h-72 rounded-md shadow-2xl" />
        <div className="p-5">
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
          <button className="btn btn-xs">save</button>
          </div>
          <div>
          <button className="btn btn-xs">varify</button>
          </div>
          <div>
          <button className="btn btn-xs">Alert</button>
          </div>
          <button className="btn btn-xs">Help</button>
        </div>
        <div>
          see
        </div>
      </div>


    </div>
  )
}

export default SingleReport