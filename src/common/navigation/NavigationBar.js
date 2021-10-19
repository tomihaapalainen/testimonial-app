import { signInWithGoogleRedirect } from "../../firebase/client";
import { FaGoogle } from "react-icons/fa";
import { useUser } from "../../contexts/user";
import UserMenu from "./components/UserMenu";
import AccountModal from "./components/AccountModal";
import { useState } from "react";

const NavigationBar = () => {
  const { user } = useUser();

  const [showAccount, setShowAccount] = useState(false);

  return (
    <div className="flex flex-col p-3 sm:p-5">
      <nav className="flex justify-end items-center">
        {!user && (
          <button
            onClick={signInWithGoogleRedirect}
            className="px-5 py-2 w-full max-w-xs border border-gray-800 flex justify-between items-center shadow-md hover:shadow-lg hover:bg-white text-gray-600 hover:text-gray-800"
          >
            <FaGoogle size={30} />
            <p>Kirjaudu Google-tilillä</p>
          </button>
        )}
        {user && <UserMenu setShowAccount={() => setShowAccount(true)} />}
      </nav>
      <AccountModal show={showAccount} setShow={setShowAccount} />
      {showAccount && (
        <div
          onClick={() => setShowAccount(false)}
          className="absolute top-0 left-0 w-full h-screen bg-gray-100 z-10"
        ></div>
      )}
    </div>
  );
};

export default NavigationBar;
