import signUpImg from '../../../../../src/assets/home/icons/signUp.webp'

const HowWorkCard = () => {
  return (
   <div className='flex gap-5'>
     <div className="hero bg-base-200 ">
    <div className="hero-content   flex-row-reverse">
      <img
        src={signUpImg}
        className="max-w-sm rounded-lg  " />
      <div>
        <h1 className="text-xl font-bold">Create Your Account</h1>
        <p className="py-6">
        Sign up with your email or phone number to get started. It’s quick and free!
        </p>
       
      </div>
    </div>
  </div>
  <div className="hero bg-base-200 ">
    <div className="hero-content   flex-row-reverse">
      <img
        src={signUpImg}
        className="max-w-sm rounded-lg  " />
      <div>
        <h1 className="font-bold">Create Your Account</h1>
        <p className="py-6">
        Sign up with your email or phone number to get started. It’s quick and free!
        </p>
       
      </div>
    </div>
  </div>
   </div>
  )
}

export default HowWorkCard