
import { useForm } from "react-hook-form"
import Title from "../Shared/Tilte/Title"
const Report = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
  return (


    <div className=" my-36 bg-base-200 min-h-screen">
      <Title title={"Report a Crime"} description={`You Can report on a Crime anonymously`} />
      <div className="  bg-base-100   shrink-0 shadow-2xl ">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body  flex-col lg:flex-row justify-around ">
          {/* This is left sight dev */}
          <div className=" ">

            <div className="form-control">
              <label className="label">
                <span className="label-text">Report Headline !</span>
              </label>

              <input {...register("firstName")} type="firstname" placeholder="Headline" className="input input-bordered" required />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Report Crime Category</span>
              </label>
              <select {...register("category")} className="select select-bordered w-full">
                <option value="murder">Murder</option>
                <option value="rape">Rape</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
              </select>
            </div>

          </div>
          {/* this is right sight dev */}
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                placeholder="Write the crime details here..."
                className="textarea textarea-bordered h-32"
                required
              />
            </div>

          </div>
        </form>
      </div>
    </div>



  )
}

export default Report