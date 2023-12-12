import { useRef, useEffect } from "react";
import iceVideo from "../assets/ice.mp4";
import { Link } from "react-router-dom";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5; // Adjust the playback speed if needed
      video.play().catch((error) => console.error("Autoplay failed: ", error));
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 z-[-1] object-cover w-full h-full opacity-90"
        src={iceVideo}
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 flex justify-center items-center text-white">
        <div className="text-center">
          <p className="text-5xl uppercase font-bold">Next Move counts</p>
          <h1 className="py-3 text-3xl md:text-5xl font-bold">
            Welcome To ICECAPITAL
          </h1>
          <p className="text-2xl">
            {" "}
            We offer smart investment solutions tailored for your success.
          </p>
          <Link to={"/sign-up"}>
            <button className="py-3 px-6 sm:w-[60%] my-4 bg-white text-black hover:bg-indigo-600 hover:text-white border-0">
              Get Started
            </button>
          </Link>
          {/* <div
            className="absolute flex flex-col py-8 sm:min-w-[760px] bottom-[5%]
            mx-1 sm:left-1/2 transform md:-translate-x-1/2 bg-zinc-200
            border border-slate-300 rounded-xl text-center shadow-xl"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-indigo-600">
              Core Values
            </p>
            <div className="flex flex-wrap justify-center px-4 py-2">
              <div className="flex items-center py-2 h-6 text-black text-base md:text-lg lg:text-xl">
                Integrity
              </div>
              <div className="flex items-center py-2 h-6 text-black ml-5 text-base md:text-lg lg:text-xl">
                Innovation
              </div>
              <div className="flex items-center py-2 h-6 text-black ml-5 text-base md:text-lg lg:text-xl">
                Excellence
              </div>
              <div className="flex items-center py-2 h-6 text-black ml-5 text-base md:text-lg lg:text-xl">
                Resilience
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
