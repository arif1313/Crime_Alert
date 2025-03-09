
import { Outlet } from 'react-router-dom'
import logpic from '../../../public/registaion.png'
const SignUp = () => {
    return (
        <>
           

            <div className="min-h-screen py-20">
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                        <div >

                            <img src={logpic} alt="" />

                        </div>
                        <div className="card   shrink-0 ">
                            <div className="card-body lg:grid grid-cols-2 gap-4">
                               <>
                               <Outlet></Outlet>
                               </>
                            </div>
                        </div>
                    </div>
                </div>
           

            </div>
        </>
    )
}

export default SignUp