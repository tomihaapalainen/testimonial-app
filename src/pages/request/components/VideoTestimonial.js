import { useCallback, useRef, useState } from "react";
import { FaStop, FaVideo } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Webcam from "react-webcam";
import ReactPlayer from "react-player";

const VideoTestimonial = ({ request, cancel }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [objectURL, setObjectURL] = useState(null);

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
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

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

  if (objectURL) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-10/12 justify-center items-center max-w-screen-sm">
          <ReactPlayer url={objectURL} controls />
        </div>
        <div className="w-10/12 max-w-sm flex flex-col items-center mt-5 space-y-5 sm:space-y-10">
          <button
            onClick={handleRecordAgain}
            className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:bg-white hover:shadow-md"
          >
            Kuvaa uudestaan
          </button>
          <button
            onClick={handleStartCaptureClick}
            className="w-full flex justify-center px-5 py-3 font-bold text-white bg-green-600 hover:bg-green-500 hover:shadow-md"
          >
            Lähetä
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-10/12 max-w-screen-sm">
        <Webcam audio={false} ref={webcamRef} width={1280} height={720} />
        <div className="w-full flex items-center">
          {!capturing && (
            <button
              onClick={handleStartCaptureClick}
              className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-green-500"
            >
              <FaVideo size={30} />
            </button>
          )}
          {capturing && (
            <button
              onClick={handleStopCaptureClick}
              className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-green-500"
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
              className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:shadow-md hover:bg-white"
            >
              <p>Esikatsele</p>
            </button>
          )}
          {recordedChunks.length > 0 && (
            <button className="w-full flex justify-center px-5 py-3 font-bold text-white bg-green-600 hover:bg-green-500 hover:shadow-md">
              <p>Lähetä</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonial;
