
import { useForm } from "react-hook-form"
const Report = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
  return (


<div className=" my-36 bg-base-200 min-h-screen">
  <div className=" flex-col lg:flex-row-reverse ">
   
    <div className=" bg-base-100 w-full  shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-3  ">
      {/* <select {...register("gender")} >
        <option value="female">Anonymous</option>
        <option value="male">public</option>
        
      </select> */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
         
          <input {...register("firstName")} type="firstname" placeholder="first name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
         
          <input {...register("firstName")} type="firstname" placeholder="first name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last  Name</span>
          </label>
          <input {...register("las5Name")} type="lastname" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6 ">
          <button className="btn btn-primary ">Report</button>
        </div>
      </form>
    </div>
  </div>
  {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form> */}
</div>

       

  )
}

export default Report