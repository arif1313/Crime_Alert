


import signUpImg from "../../../../assets/home/icons/signUp.webp";
import location from "../../../../assets/home/icons/location.jpg";
import alert from "../../../../assets/home/icons/alert.jpg";
import incident from "../../../../assets/home/icons/incident.png";
import { useState } from "react";
import HowWorkCard, { WheelControls } from "../HowWorkCard/HowWorkCard";
import { useKeenSlider } from "keen-slider/react";



const HowItworkSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: false,
      rubberband: false,
      vertical: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [WheelControls]
  );
const howWorkINformation=[
  {
    Title: "Create Account",
    Description: "Sign up with your email or phone number to get started. It’s quick and free!",
    Image: signUpImg,
  },
  {
    Title: "Set Your Location",
    Description: "Allow location access to receive alerts for your area.",
    Image: location,
  },
  {
    Title: "Receive Alerts on Your Phone",
    Description: "Get real-time crime alerts based on your location.",
    Image: alert,
  },
  {
    Title: "Report an Incident",
    Description: "Help keep your community safe by reporting suspicious activity.",
    Image: incident,
  },
]
  return (
    <div className="slider-container" style={{ position: "relative" }}>
      {/* Numbers on the Left Side */}
      <div className="slide-numbers">
        {loaded &&
          instanceRef.current &&
          [...Array(instanceRef.current.track.details.slides.length)].map(
            (_, idx) => (
              <div
                key={idx}
                className={`slide-number ${idx === currentSlide ? "active" : ""}`}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
              >
                step:{idx + 1}
              </div>
            )
          )}
      </div>

      {/* Main Slider */}
      <div ref={sliderRef} className="keen-slider" style={{ height: 300 }}>
      {
        howWorkINformation.map((information,inx)=><HowWorkCard key={inx} Title={information.Title} Description={information.Description} Image={information.Image}></HowWorkCard>)
      }
{/*       
        <div className={`keen-slider__slide number-slide3 flex   justify-center items-center gap-10`}> 
            <div>
            <img src={signUpImg} className="max-w-sm rounded-lg" alt="Sign Up" />
          </div>
          <div>
            <h1 className="font-bold">Create Your Account</h1>
            <p className="py-6">
              Sign up with your email or phone number to get started. It’s quick and free!
            </p>
          </div></div>
        <div className="keen-slider__slide number-slide4  flex flex-row-reverse justify-center items-center gap-10"> 
             <div>
            <img src={location} className="max-w-sm rounded-lg" alt="Sign Up" />
          </div>
          <div>
            <h1 className="font-bold">Set your location</h1>
            <p className="py-6">
              Sign up with your email or phone number to get started. It’s quick and free!
            </p>
          </div></div>
        <div className="keen-slider__slide number-slide5 flex justify-center items-center gap-10">   <div>
            <img src={alert} className="max-w-sm rounded-lg" alt="Sign Up" />
          </div>
          <div>
            <h1 className="font-bold">Recive alert on your phone</h1>
            <p className="py-6">
              Sign up with your email or phone number to get started. It’s quick and free!
            </p>
          </div></div>
        <div className="keen-slider__slide number-slide6 flex flex-row-reverse justify-center items-center gap-10"> <div>
            <img src={incident} className="max-w-sm rounded-lg" alt="Sign Up" />
          </div>
          <div>
            <h1 className="font-bold">report an  incident</h1>
            <p className="py-6">
              Sign up with your email or phone number to get started. It’s quick and free!
            </p>
          </div></div> */}
      </div>

      {/* Navigation Arrows on the Right Side */}
      <div className="navigation-arrows">
        {loaded && instanceRef.current && (
          <>
            <Arrow
              up
              onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={
                currentSlide === instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

// Arrow Component for Navigation
// eslint-disable-next-line react/prop-types
function Arrow({ up, onClick, disabled }) {
  return (
    <svg
      onClick={onClick}
      className={`arrow ${up ? "arrow--up" : "arrow--down"} ${
        disabled ? "arrow--disabled" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {up ? (
        <path d="M12 5l-7 7h14z" /> // Correct Upward Arrow ▲
      ) : (
        <path d="M12 19l7-7H5z" /> // Correct Downward Arrow ▼
      )}
    </svg>
  );
}

export default HowItworkSlider;
