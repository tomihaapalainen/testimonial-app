import ReactPlayer from "react-player";
import "./Videomonial.css";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { getIdToken } from "@firebase/auth";
import axios from "axios";
import { baseUrl } from "../../config";
import { useUser } from "../../contexts/user";
import ButtonSpinner from "../loading/ButtonSpinner";

const Videomonial = ({ testimonial, updateTestimonial, preview = true }) => {
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { user } = useUser();

  const acceptTestimonial = () => {
    setUpdating(true);
    getIdToken(user)
      .then((idToken) => {
        axios
          .post(
            `${baseUrl}/testimonial/update`,
            {
              id: testimonial.id,
              is_accepted: true,
            },
            { headers: { Authorization: `Bearer ${idToken}` } }
          )
          .then((response) => {
            if (response.status === 200) {
              updateTestimonial(testimonial, response.data);
            }
          });
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const hideTestimonial = () => {
    setUpdating(true);
    getIdToken(user)
      .then((idToken) => {
        axios
          .post(
            `${baseUrl}/testimonial/update`,
            {
              id: testimonial.id,
              is_accepted: false,
            },
            { headers: { Authorization: `Bearer ${idToken}` } }
          )
          .then((response) => {
            if (response.status === 200) {
              updateTestimonial(testimonial, response.data);
            }
          });
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <div className="flex flex-col w-full h-full shadow-lg">
      <div className="player-container group w-full h-full rounded-md">
        <ReactPlayer
          onError={() => setVideoError(true)}
          url={testimonial.video_url}
          className="absolute top-0 left-0 rounded-md"
          width="100%"
          height="100%"
          playing={playing}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="flex flex-col justify-start items-center font-bold text-lg absolute top-0 left-0 bg-sky-700 w-full px-3 py-1">
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
        {videoError && (
          <div className="absolute bottom-0 w-full text-center">
            <p className="text-red-700">Täällä ei näytä olevan mitään...</p>
          </div>
        )}
        <button
          disabled={videoError}
          className="absolute z-10 top-0 right-0 w-full h-full disabled:opacity-50"
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
            <button
              disabled={updating}
              onClick={acceptTestimonial}
              className="flex space-x-1 justify-center items-center w-full m-1 py-2 bg-sky-600 hover:bg-sky-700 text-white"
            >
              <p>Julkaise</p>
              <div className="pl-2 w-4 h-4">
                {updating && <ButtonSpinner />}
              </div>
            </button>
          )}
          {testimonial.is_accepted && (
            <button
              disabled={updating}
              onClick={hideTestimonial}
              className="flex space-x-1 justify-center items-center w-full m-1 py-2 bg-red-700 hover:bg-red-800 text-white"
            >
              <p>Piilota</p>
              <div className="pl-2 w-4 h-4">
                {updating && <ButtonSpinner />}
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Videomonial;
