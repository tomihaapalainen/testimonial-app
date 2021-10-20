import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const TextTestimonial = () => {
  const [capturedImage, setCapturedImage] = useState("");
  const [acceptedImage, setAcceptedImage] = useState("");

  const testimonialRef = useRef();

  const webcamRef = useRef();
  const cropperRef = useRef();

  const captureWebcamImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleClickAcceptCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const image = cropper.getCroppedCanvas().toDataURL();
    setAcceptedImage(image);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-20">
      <div className="flex w-10/12 max-w-screen-sm">
        <textarea
          ref={testimonialRef}
          className="w-full shadow-md focus:outline-none p-2 resize-none h-52"
        />
      </div>
      <div className="w-1/2 flex flex-col border border-gray-800">
        {!capturedImage && (
          <div>
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
            <div className="w-full flex justify-between items-center p-3">
              <button onClick={captureWebcamImage}>
                <FaCamera size={30} className="text-gray-800" />
              </button>
            </div>
          </div>
        )}
        {capturedImage && !acceptedImage && (
          <div>
            <Cropper src={capturedImage} ref={cropperRef} aspectRatio={1 / 1} />
            <div className="w-full flex justify-between items-center text-gray-700">
              <button
                className="p-5 hover:text-green-500"
                onClick={handleClickAcceptCrop}
              >
                <FaCheck size={30} />
              </button>
              <button
                className="p-5 hover:text-red-500"
                onClick={() => setCapturedImage(null)}
              >
                <ImCross size={30} />
              </button>
            </div>
          </div>
        )}
        {acceptedImage && (
          <div className="w-24 h-24">
            <img src={acceptedImage} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextTestimonial;
