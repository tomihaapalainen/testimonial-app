import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { handleSignOut } from "../../../firebase/client";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer text-gray-900 hover:text-gray-700"
      >
        <FaUserAlt size={25} />
      </button>
      <div className="relative">
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="cursor-pointer absolute right-1 top-1 w-40 z-20 p-2 flex flex-col space-y-4 border border-gray-300 bg-gray-50"
          >
            <button
              onClick={handleSignOut}
              className="px-3 py-1 text-gray-900 hover:text-gray-700"
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
