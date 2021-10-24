import vid from "../../../vid.webm";
import ReactPlayer from "react-player";
import "./Videomonial.css";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const Videomonial = ({ testimonial }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex w-full h-full">
      <div className="player-container group w-full h-full">
        <ReactPlayer
          url={vid}
          playIcon={
            <button className="text-emerald-500 font-bold h-full w-full">
              Play
            </button>
          }
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          playing={playing}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="absolute top-0 left-0 bg-emerald-700 text-white w-full px-3 py-1">
            <div className="w-full flex justify-start">
              <p>{testimonial.giver_name}</p>
            </div>
            <div className="w-full flex space-x-1 text-lime-400">
              <p>{testimonial.giver_title}</p>
              {testimonial.business_name && (
                <p>@ {testimonial.business_name}</p>
              )}
            </div>
          </div>
        )}
        <button
          className="hidden group-hover:block absolute z-10 top-0 right-0 w-full h-full"
          onClick={() => setPlaying(!playing)}
        >
          <div className="p-2 w-full h-full flex justify-center items-center">
            {!playing && <FaPlay size={35} className="text-emerald-300" />}
            {playing && <FaPause size={35} className="text-emerald-300" />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Videomonial;
