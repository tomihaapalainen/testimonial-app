import { signInWithGoogleRedirect } from "../../firebase/client";
import { FaGoogle } from "react-icons/fa";
import { useUser } from "../../contexts/user";
import UserMenu from "./components/UserMenu";

const NavigationBar = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col p-3 sm:p-5 border-b-2 border-gray-900 text-gray-100">
      {!user && (
        <nav className="flex justify-end items-center">
          <button
            onClick={signInWithGoogleRedirect}
            className="px-5 py-2 w-full max-w-xs flex justify-between items-center shadow-md hover:shadow-lg bg-gray-900 text-gray-100 hover:bg-gray-700"
          >
            <FaGoogle size={30} />
            <p>Kirjaudu Google-tilillä</p>
          </button>
        </nav>
      )}
      {user && (
        <nav className="w-full flex items-center">
          <div className="w-full flex justify-end items-center px-5 py">
            <UserMenu />
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavigationBar;
