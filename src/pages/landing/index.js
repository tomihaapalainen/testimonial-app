import { FaGoogle } from "react-icons/fa";
import { signInWithGoogleRedirect } from "../../firebase/client";

const LandingPage = () => {
  const handleRegisterWithGoogle = async () => {
    await signInWithGoogleRedirect();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <button
        onClick={handleRegisterWithGoogle}
        className="flex justify-between items-center w-full max-w-xs px-5 py-2 shadow-md hover:shadow-lg bg-gray-900 hover:bg-gray-700 text-gray-100"
      >
        <FaGoogle size={30} />
        <p className="text-base sm:text-lg">Rekisteröidy Google-tilillä</p>
      </button>
    </div>
  );
};

export default LandingPage;
