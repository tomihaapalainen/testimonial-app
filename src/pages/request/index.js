import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseUrl } from "../../config";
import axios from "axios";
import Spinner from "../../common/loading/Spinner";
import { FaPenAlt, FaRegSmileBeam, FaVideo } from "react-icons/fa";
import TextTestimonial from "./components/TextTestimonial";
import VideoTestimonial from "./components/VideoTestimonial";

const RequestPage = () => {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [givingFeedback, setGivingFeedback] = useState(false);
  const [givingVideoFeedback, setGivingVideoFeedback] = useState(false);

  const fetchRequest = useCallback(async () => {
    axios
      .get(`${baseUrl}/testimonialrequest/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setRequest(response.data);
        }
      })
      .catch(() => {
        setErrorMessage("Täällä ei näytä olevan mitään ¯\\_(ツ)_/¯");
      });
  }, [id]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  if (!request && !errorMessage) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col justify-center items-center">
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    );
  }

  if (givingFeedback) {
    return (
      <TextTestimonial
        request={request}
        cancel={() => setGivingFeedback(false)}
      />
    );
  }

  if (givingVideoFeedback) {
    return (
      <VideoTestimonial
        request={request}
        cancel={() => setGivingVideoFeedback(false)}
      />
    );
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-20 mt-10 sm:mt-20">
      <div className="flex flex-col text-center max-w-screen-md space-y-5 sm:space-y-10">
        <h2 className="text-7xl text-gray-800">
          Haluisitko antaa suosittelun <strong>{request.business_name}</strong>
          :lle?
        </h2>
        <div className="flex justify-center items-center space-x-5">
          <h2 className="text-gray-500 text-xl">
            Kuulisimme mielellämme ajatuksiasi
          </h2>
          <FaRegSmileBeam size={25} className="text-gray-700" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center space-y-10 sm:space-y-20">
        <button
          onClick={() => setGivingVideoFeedback(true)}
          className="flex text-gray-800 justify-between items-center text-center px-5 py-4 border border-gray-800 hover:bg-white shadow-md hover:shadow-lg w-10/12 max-w-xs"
        >
          <FaVideo size={28} />
          <p>Kuvaa suosittelu</p>
        </button>
        <button
          onClick={() => setGivingFeedback(true)}
          className="flex text-sm text-gray-600 hover:text-gray-800 justify-between items-center text-center px-5 py-3 border border-gray-500 hover:bg-white shadow-md hover:shadow-lg w-10/12 max-w-xs"
        >
          <FaPenAlt size={20} className="opacity-100" />
          <p>Kirjoita suosittelu</p>
        </button>
      </div>
    </div>
  );
};

export default RequestPage;
