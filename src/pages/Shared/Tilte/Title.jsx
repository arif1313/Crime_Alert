

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
const Title = ({title}) => {
      useEffect(() => {
        AOS.init({ duration: 800 });
      }, []);
  return (
    <div data-aos="fade-down" className="font-extrabold m-12 text-3xl ">{title} <span className="text-6xl text-red-600">?</span></div>
  )
}

export default Title