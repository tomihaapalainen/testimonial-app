import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useForm } from "react-hook-form";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ImageSelection from "./ImageSelection";
import "./TextTestimonial.css";
import { useHistory } from "react-router";
import axios from "axios";
import { baseUrl } from "../../../config";

const TextTestimonial = ({ request, cancel }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const history = useHistory();

  const [open, setOpen] = useState(false);

  const [capturingImage, setCapturingImage] = useState(false);
  const [candidateImage, setCandidateImage] = useState("");
  const [acceptedImage, setAcceptedImage] = useState("");

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

  const onSubmit = async (data) => {
    const { username, usertitle, userbusiness, usertestimonial } = data;

    try {
      const data = new FormData();
      const blob = await fetch(acceptedImage).then((res) => res.blob());
      data.append("image", blob, "image.png");
      const uploadResponse = await axios.post(
        `${baseUrl}/testimonial/image`,
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
          picture_url: uploadResponse.data.url,
          text: usertestimonial,
        });

        if (saveResponse.status === 201) {
          history.push("/thankyou");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-10/12 max-w-screen-md space-y-3"
      >
        <div className="flex space-x-5 sm:space-x-10">
          <ImageSelection
            open={open}
            setOpen={setOpen}
            image={acceptedImage}
            setImage={setAcceptedImage}
            capturingImage={capturingImage}
            setCapturingImage={setCapturingImage}
            setCandidateImage={setCandidateImage}
          />
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
        </div>
        <div>
          <textarea
            {...register("usertestimonial", {
              required: {
                value: true,
                message: "Anna vähintään 50 merkkiä pitkä suosittelu",
              },
              minLength: {
                value: 50,
                message: "Vähimmäispituus on 50 merkkiä",
              },
            })}
            className="w-full h-52 resize-none text-gray-800 bg-gray-100 appearance-none outline-none bg-none p-2"
            placeholder="Kirjoita suosittelusi tähän..."
          />
          <div className="h-6">
            {errors.usertestimonial && (
              <p className="text-red-600 text-xs">
                {errors.usertestimonial.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-gray-800 text-center px-3 py-2 border border-gray-800 hover:bg-white shadow-md hover:shadow-lg w-10/12 max-w-xs"
          >
            Lähetä
          </button>
        </div>
      </form>
      <div className="w-10/12 max-w-screen-md flex flex-col">
        {capturingImage && !candidateImage && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-300">
            <div className="w-10/12 max-w-3xl">
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
                  className="flex justify-center border border-gray-400 px-5 py-3 text-gray-800 hover:text-red-500"
                >
                  <ImCross size={30} />
                </button>
              </div>
            </div>
          </div>
        )}
        {candidateImage && !acceptedImage && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-300">
            <div className="w-10/12 max-w-3xl">
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
                  className="flex justify-center border border-gray-400 px-5 py-3 hover:text-red-500"
                  onClick={() => setCandidateImage(null)}
                >
                  <ImCross size={30} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!capturingImage && (
        <div className="py-10">
          <button
            onClick={cancel}
            className="px-5 py-2 text-gray-600 border border-gray-200 shadow-md"
          >
            Peruuta
          </button>
        </div>
      )}
    </div>
  );
};

export default TextTestimonial;
