import { signInWithGoogleRedirect } from "../../firebase/client";
import { FaGoogle } from "react-icons/fa";
import { useUser } from "../../contexts/user";

const NavigationBar = () => {
  const { user } = useUser();

  return (
    <div className="px-3 py-5 sm:py-10">
      <nav className="flex justify-end items-center">
        {!user && (
          <button
            onClick={signInWithGoogleRedirect}
            className="px-5 py-2 w-full max-w-xs border border-gray-800 flex justify-between items-center shadow-md hover:shadow-lg hover:bg-white"
          >
            <FaGoogle size={30} className="text-gray-800" />
            <p>Kirjaudu Google-tilillä</p>
          </button>
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;
