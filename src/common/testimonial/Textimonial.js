import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useUser } from "../../contexts/user";
import { getIdToken } from "@firebase/auth";
import axios from "axios";
import { baseUrl } from "../../config";
import ButtonSpinner from "../loading/ButtonSpinner";

const Textimonial = ({ testimonial, updateTestimonial, preview = false }) => {
  const [imageError, setImageError] = useState(false);
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

  const hideTestimonial = async () => {
    setUpdating(true);
    await new Promise((res) => setTimeout(res, 2000));
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
          .then(async (response) => {
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
    <div className="w-full flex flex-col shadow-lg text-lg">
      <div className="w-full flex justify-start leading-5 p-3 space-x-3 bg-gray-800 text-gray-300 font-bold">
        <div className="w-14 h-14 flex justify-center items-center">
          {!imageError && (
            <img
              className="w-full h-full"
              src={testimonial.picture_url}
              onError={() => setImageError(true)}
              alt=""
            />
          )}
          {imageError && <FaUser size={45} className="text-gray-300" />}
        </div>
        <div>
          <div className="w-full flex justify-start uppercase">
            <p>{testimonial.giver_name}</p>
          </div>
          <div className="w-full flex space-x-1 text-gray-200 text-base">
            <p>{testimonial.giver_title}</p>
            {testimonial.business_name && <p>@ {testimonial.business_name}</p>}
          </div>
        </div>
      </div>
      <div className="p-3">
        <span>{testimonial.text}</span>
      </div>
      {preview && (
        <div className="flex h-full justify-center items-end">
          {!testimonial.is_accepted && (
            <button
              disabled={updating}
              onClick={acceptTestimonial}
              className="flex space-x-1 justify-center items-center w-full m-1 py-2 bg-gray-900 hover:bg-gray-700 text-gray-100"
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
              className="flex space-x-1 justify-center items-center w-full m-1 py-2 bg-gray-300 hover:bg-gray-400"
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

export default Textimonial;
