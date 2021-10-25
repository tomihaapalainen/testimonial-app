import { useCallback, useRef, useState } from "react";
import { FaStop, FaVideo } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Webcam from "react-webcam";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config";
import { useHistory } from "react-router";

const VideoTestimonial = ({ request, cancel }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const history = useHistory();

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [objectURL, setObjectURL] = useState(null);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(async () => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handlePreview = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      setObjectURL(url);
    }
  }, [recordedChunks]);

  const handleRecordAgain = () => {
    setObjectURL(null);
    setRecordedChunks([]);
  };

  const onSubmit = async (data) => {
    const { username, usertitle, userbusiness } = data;

    try {
      const data = new FormData();
      const blob = await fetch(objectURL).then((res) => res.blob());
      data.append("video", blob, "video.webm");
      const uploadResponse = await axios.post(
        `${baseUrl}/testimonial/video`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data;" },
        }
      );
      if (uploadResponse.status === 200) {
        const saveResponse = await axios.post(`${baseUrl}/testimonial/new`, {
          giver_name: username,
          giver_title: usertitle,
          business_name: userbusiness,
          business_identity: request.business_identity,
          video_url: uploadResponse.data.url,
        });

        if (saveResponse.status === 201) {
          history.push("/thankyou");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (objectURL) {
    return (
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 max-w-screen-sm space-y-5 flex flex-col justify-center items-center"
        >
          <div className="flex flex-col w-10/12 justify-center items-center max-w-screen-sm">
            <ReactPlayer url={objectURL} controls />
          </div>
          <button
            onClick={handleRecordAgain}
            className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:bg-white hover:shadow-md"
          >
            Kuvaa uudestaan
          </button>
          <div className="w-full flex flex-col">
            <div>
              <label className="text-sm text-gray-700">Nimesi*</label>
              <div className="w-full border-b border-gray-300 rounded-sm focus-within:border-gray-600">
                <input
                  {...register("username", { required: true })}
                  type="text"
                  onFocus={(e) => e.target.select()}
                  className="w-full text-gray-800 bg-gray-50 appearance-none outline-none bg-none p-1"
                />
              </div>
              <div className="h-6">
                {errors.username && (
                  <p className="text-red-600 text-xs">Täytä nimesi</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700">Tittelisi*</label>
              <div className="w-full border-b border-gray-300 rounded-sm focus-within:border-gray-600">
                <input
                  {...register("usertitle", { required: true })}
                  type="text"
                  onFocus={(e) => e.target.select()}
                  className="w-full text-gray-800 bg-gray-50 appearance-none outline-none bg-none p-1"
                />
              </div>
              <div className="h-6">
                {errors.usertitle && (
                  <p className="text-red-600 text-xs">Täytä tittelisi</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700">Yrityksesi</label>
              <div className="w-full border-b border-gray-300 rounded-sm focus-within:border-gray-600">
                <input
                  {...register("userbusiness")}
                  type="text"
                  onFocus={(e) => e.target.select()}
                  className="w-full text-gray-800 bg-gray-50 appearance-none outline-none bg-none p-1"
                />
              </div>
            </div>
          </div>
          <div className="w-10/12 max-w-sm flex flex-col items-center mt-5 sm:mt-10 space-y-5 sm:space-y-10">
            <button
              type="submit"
              className="w-full flex justify-center px-5 py-3 font-bold text-white bg-sky-600 hover:bg-sky-500 hover:shadow-md"
            >
              Lähetä
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-10/12 max-w-screen-sm">
        <Webcam
          audio={true}
          ref={webcamRef}
          width={1280}
          height={720}
          videoConstraints={{ width: 1280, height: 720, frameRate: 30 }}
        />
        <div className="w-full flex items-center">
          {!capturing && (
            <button
              onClick={handleStartCaptureClick}
              className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-sky-500"
            >
              <FaVideo size={30} />
            </button>
          )}
          {capturing && (
            <button
              onClick={handleStopCaptureClick}
              className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-sky-500"
            >
              <FaStop size={30} />
            </button>
          )}
          <button
            onClick={cancel}
            className="flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-red-500"
          >
            <ImCross size={30} />
          </button>
        </div>
        <div className="w-full flex flex-col items-center mt-5 sm:mt-10 space-y-5 sm: space-y-10">
          {recordedChunks.length > 0 && (
            <button
              onClick={handlePreview}
              className="w-full flex justify-center px-5 py-3 font-bold text-white bg-sky-600 hover:bg-sky-500 hover:shadow-md"
            >
              <p>Jatka</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonial;
