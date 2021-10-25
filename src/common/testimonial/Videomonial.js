import vid from "../../vid.webm";
import ReactPlayer from "react-player";
import "./Videomonial.css";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const Videomonial = ({ testimonial, preview = true }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col w-full h-full shadow-lg">
      <div className="player-container group w-full h-full rounded-md">
        <ReactPlayer
          url={vid}
          className="absolute top-0 left-0 rounded-md"
          width="100%"
          height="100%"
          playing={playing}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="flex flex-col justify-start items-center font-bold text-lg absolute top-0 left-0 bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 w-full px-3 py-1">
            <div className="w-full flex justify-start text-white uppercase">
              <p>{testimonial.giver_name}</p>
            </div>
            <div className="w-full flex space-x-1 text-white text-base">
              <p>{testimonial.giver_title}</p>
              {testimonial.business_name && (
                <p>@ {testimonial.business_name}</p>
              )}
            </div>
          </div>
        )}
        <button
          className="absolute z-10 top-0 right-0 w-full h-full"
          onClick={() => setPlaying(!playing)}
        >
          <div className="p-2 w-full h-full flex justify-center items-center">
            {!playing && (
              <FaPlay
                size={44}
                className="group-hover:text-sky-400 text-sky-500"
              />
            )}
            {playing && (
              <FaPause
                size={44}
                className="hidden group-hover:block text-sky-400"
              />
            )}
          </div>
        </button>
      </div>
      {preview && (
        <div className="flex h-full justify-center items-end">
          {!testimonial.is_accepted && (
            <button className="w-full m-1 py-2 shadow-md uppercase bg-sky-700 hover:bg-sky-600 text-white">
              Julkaise
            </button>
          )}
          {testimonial.is_accepted && (
            <button className="w-full m-1 py-2 shadow-md uppercase">
              Piilota
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Videomonial;
