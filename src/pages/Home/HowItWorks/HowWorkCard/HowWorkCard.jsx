import "keen-slider/keen-slider.min.css";
import "./styles.css";

export const WheelControls = (slider) => {
  let touchTimeout;
  let position = { x: 0, y: 0 };
  let wheelActive = false;

  function dispatch(e, name) {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: { x: position.x, y: position.y },
      })
    );
  }

  function wheelStart(e) {
    position = { x: e.pageX, y: e.pageY };
    dispatch(e, "ksDragStart");
  }

  function wheel(e) {
    dispatch(e, "ksDrag");
  }

  function wheelEnd(e) {
    dispatch(e, "ksDragEnd");
  }

  function eventWheel(e) {
    e.preventDefault();
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, { passive: false });
  });
};
// eslint-disable-next-line react/prop-types
const HowWorkCard = ({Description, Title,Image}) => {

 
  return (
    <div className="keen-slider__slide number-slide2 flex flex-row-reverse justify-center items-center gap-10 ">
        
              <div>
              <img src={Image} className="max-w-sm rounded-lg" alt="Sign Up" />
            </div>
            <div className="flex items-center justify-center ">
            <div className="w-96">
          
            <h1 className="font-bold text-3xl">{Title}</h1>
              <p className="py-6 text-xl">
                {Description}
              </p>
            </div>
            </div>
       
          </div>
  )
}

export default HowWorkCard