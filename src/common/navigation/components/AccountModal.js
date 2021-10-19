import { useUser } from "../../../contexts/user";

const AccountModal = ({ show, setShow }) => {
  const { userData } = useUser();

  const inputClasses =
    "w-full placeholder-gray-400 focus:placeholder-gray-500 focus:outline-none appearance-none bg-transparent p-2";
  const divClasses =
    "w-full border-b border-gray-400 focus-within:border-gray-300";
  const labelClasses = "text-gray-800 text-sm";

  if (!show) {
    return <></>;
  }

  // TODO: functionality

  return (
    <div className="absolute flex justify-center items-center w-screen">
      <div className="flex flex-col z-20 p-5 justify-between items-center h-4/5 max-w-screen-md border border-gray-600">
        <div className="flex flex-col w-full justify-center items-start space-y-5">
          <div className={`${divClasses}`}>
            <label className={`${labelClasses}`}>Nimi</label>
            <input
              type="text"
              onFocus={(e) => e.target.select()}
              className={`${inputClasses}`}
              defaultValue={userData.name}
            />
          </div>
          <div className={`${divClasses}`}>
            <label className={`${labelClasses}`}>Yritys</label>
            <input
              type="text"
              onFocus={(e) => e.target.select()}
              className={`${inputClasses}`}
              defaultValue={userData.business.name}
            />
          </div>
          <div className={`${divClasses}`}>
            <label className={`${labelClasses}`}>Y-tunnus</label>
            <input
              type="text"
              onFocus={(e) => e.target.select()}
              className={`${inputClasses}`}
              defaultValue={userData.business.identity}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center p-5 space-x-5">
          <button
            onClick={() => setShow(false)}
            className="text-gray-600 px-5 py-2 hover:bg-gray-200"
          >
            sulje
          </button>
          <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold px-5 py-2">
            tallenna
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
