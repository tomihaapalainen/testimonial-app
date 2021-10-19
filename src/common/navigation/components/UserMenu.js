import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { handleSignOut } from "../../../firebase/client";

const UserMenu = ({ setShowAccount }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-5 flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="px-2 flex justify-between items-center cursor-pointer text-gray-600 hover:text-gray-800"
      >
        <div>
          <FaUserAlt size={30} />
        </div>
      </button>
      <div className="relative">
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="cursor-pointer absolute right-1 top-1 w-40 z-20 p-2 flex flex-col space-y-4 border border-gray-300 bg-gray-50"
          >
            <button
              onClick={setShowAccount}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Tili
            </button>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Kirjaudu ulos
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

export default UserMenu;
