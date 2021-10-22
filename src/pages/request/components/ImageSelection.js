import { useRef } from "react";
import { FaCamera, FaImage, FaRedo, FaUpload } from "react-icons/fa";

const ImageSelection = ({
  open,
  setOpen,
  image,
  setImage,
  capturingImage,
  setCapturingImage,
  setCandidateImage,
}) => {
  const fileInputRef = useRef();

  const handleStartCapturingImage = () => {
    setOpen(false);
    setCapturingImage(true);
  };

  const handleRedo = () => {
    setImage(null);
    setCandidateImage(null);
  };

  const handleFileInput = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  if (image) {
    return (
      <div className="flex flex-col justify-center items-center w-52">
        <img src={image} alt="" />
        <button
          onClick={handleRedo}
          className="w-full flex justify-center items-center py-5 text-gray-500 hover:text-gray-800"
        >
          <FaRedo size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center border border-gray-400 w-40 shadow-md">
      <div className="w-full h-full cursor-pointer flex justify-center items-center text-gray-800 hover:text-green-500">
        {!open && (
          <button
            disabled={capturingImage}
            className="w-full h-full flex justify-center items-center disabled:opacity-50"
            onClick={() => setOpen(true)}
          >
            <FaImage size={30} />
          </button>
        )}
        {open && (
          <div className="w-full h-full flex flex-col justify-evenly items-center z-20">
            <button
              onClick={handleStartCapturingImage}
              className="w-full h-full flex justify-center items-center p-3 text-gray-800 hover:text-green-500"
            >
              <FaCamera size={30} />
            </button>
            <button
              onClick={handleFileInput}
              className="relative w-full h-full flex justify-center items-center p-3 text-gray-800 hover:text-green-500"
            >
              <input
                type="file"
                id="image-upload-input"
                ref={fileInputRef}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <FaUpload size={30} />
            </button>
          </div>
        )}
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="top-0 left-0 absolute w-full h-full z-10"
        />
      )}
    </div>
  );
};

export default ImageSelection;
