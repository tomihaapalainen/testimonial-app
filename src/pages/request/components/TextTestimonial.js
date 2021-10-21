import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ImageSelection from "./ImageSelection";
import "./TextTestimonial.css";

const TextTestimonial = ({ cancel }) => {
  const [open, setOpen] = useState(false);

  const [capturingImage, setCapturingImage] = useState(false);
  const [candidateImage, setCandidateImage] = useState("");
  const [acceptedImage, setAcceptedImage] = useState("");

  const testimonialRef = useRef();

  const webcamRef = useRef();
  const cropperRef = useRef();

  const captureWebcamImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCandidateImage(imageSrc);
  }, [webcamRef]);

  const handleClickAcceptCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const image = cropper.getCroppedCanvas().toDataURL();
    setAcceptedImage(image);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <div className="flex w-10/12 max-w-screen-md h-52">
        <ImageSelection
          open={open}
          setOpen={setOpen}
          image={acceptedImage}
          setImage={setAcceptedImage}
          capturingImage={capturingImage}
          setCapturingImage={setCapturingImage}
          setCandidateImage={setCandidateImage}
        />
        <textarea
          ref={testimonialRef}
          className="w-full h-full resize-none text-gray-800 bg-gray-200 appearance-none outline-none bg-none p-2"
          placeholder="Kirjoita palautteesi tähän..."
        />
      </div>
      <div className="w-10/12 max-w-screen-md flex flex-col">
        {capturingImage && !candidateImage && (
          <div className="fade-in">
            <Webcam
              height={720}
              width={1280}
              screenshotFormat="image/png"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
              ref={webcamRef}
            />
            <div className="w-full flex items-center">
              <button
                onClick={captureWebcamImage}
                className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-green-500"
              >
                <FaCamera size={30} />
              </button>
              <button
                onClick={() => setCapturingImage(false)}
                className="w-full flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-red-500"
              >
                <ImCross size={30} />
              </button>
            </div>
          </div>
        )}
        {candidateImage && !acceptedImage && (
          <div>
            <Cropper
              src={candidateImage}
              ref={cropperRef}
              aspectRatio={1 / 1}
            />
            <div className="w-full flex justify-between items-center text-gray-700">
              <button
                className="w-full flex justify-center border border-gray-400 px-5 py-3 hover:text-green-500"
                onClick={handleClickAcceptCrop}
              >
                <FaCheck size={32} />
              </button>
              <button
                className="w-full flex justify-center border border-gray-400 px-5 py-3 hover:text-red-500"
                onClick={() => setCandidateImage(null)}
              >
                <ImCross size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
      {!capturingImage && (
        <div className="absolute bottom-10">
          <button
            onClick={cancel}
            className="px-5 py-2 border border-gray-200 shadow-md"
          >
            Peruuta
          </button>
        </div>
      )}
    </div>
  );
};

export default TextTestimonial;
