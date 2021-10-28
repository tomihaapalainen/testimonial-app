import { useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/user";
import axios from "axios";
import { baseUrl } from "../../config";
import Spinner from "../../common/loading/Spinner";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const history = useHistory();
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUserData } = useUser();

  const onSubmit = async (data) => {
    const { name, businessname, businessid } = data;

    setLoading(true);

    axios
      .post(`${baseUrl}/register/new`, {
        email: user.email,
        user_name: name,
        business_name: businessname,
        business_identity: businessid,
      })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          setErrorMessage(error.response.data.detail);
        }
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center py-10 sm:py-20">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm px-5">
        <div>
          <label className="text-sm text-gray-700">Nimi*</label>
          <div className="w-full border-b border-gray-300 rounded-sm focus-within:border-gray-600">
            <input
              {...register("name", { required: true })}
              type="text"
              onFocus={(e) => e.target.select()}
              defaultValue={user.displayName}
              className="w-full text-gray-800 bg-gray-50 appearance-none outline-none bg-none p-1"
            />
          </div>
          <div className="h-6">
            {errors.name?.type === "required" && (
              <p className="text-red-600 text-xs">Täytä nimi</p>
            )}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-700">Yritys*</label>
          <div className="w-full border-b border-gray-300 rounded-sm focus-within:border-gray-600">
            <input
              {...register("businessname", { required: true })}
              type="text"
              className="w-full text-gray-800 bg-gray-50 appearance-none outline-none bg-none p-1"
            />
          </div>
          <div className="h-6">
            {errors.businessname?.type === "required" && (
              <p className="text-red-600 text-xs">Täytä yrityksen nimi</p>
            )}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-700">Y-tunnus*</label>
          <div className="w-full border-b border-gray-300 rounded-sm focus-within:border-gray-600">
            <input
              {...register("businessid", { required: true })}
              type="text"
              className="w-full text-gray-800 bg-gray-50 appearance-none outline-none bg-none p-1"
            />
          </div>
          <div className="h-6">
            {errors.businessid?.type === "required" && (
              <p className="text-red-600 text-xs">Täytä Y-tunnus</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {loading && <Spinner />}
          {!loading && (
            <button
              className="flex-shrink-0 text-md text-gray-900 py-2 my-5 px-5 shadow-md hover:bg-white"
              type="submit"
            >
              <p className="px-5 py-1">Rekisteröidy</p>
            </button>
          )}
        </div>
      </form>
      {errorMessage && (
        <div className="flex justify-center items-center w-full my-5">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
