import pic from "../../pic.png";

const Textimonial = ({ testimonial, preview = false }) => {
  return (
    <div className="w-full flex flex-col shadow-lg text-lg">
      <div className="w-full flex justify-start leading-5 p-3 space-x-3 bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-white font-bold">
        <div className="w-14 h-14">
          <img className="w-full h-full" src={pic} alt="" />
        </div>
        <div>
          <div className="w-full flex justify-start">
            <p>{testimonial.giver_name}</p>
          </div>
          <div className="w-full flex space-x-1 text-white text-base">
            <p>{testimonial.giver_title}</p>
            {testimonial.business_name && <p>@ {testimonial.business_name}</p>}
          </div>
        </div>
      </div>
      <div className="p-3">
        <span>{testimonial.text}</span>
      </div>
      {preview && (
        <div className="flex h-full justify-center items-end">
          {!testimonial.is_accepted && (
            <button className="w-full m-1 py-2 bg-sky-600 hover:bg-sky-700 text-white">
              Hyväksy
            </button>
          )}
          {testimonial.is_accepted && (
            <button className="w-full m-1 py-2 bg-sky-600 hover:bg-sky-700 text-white">
              Piilota
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Textimonial;
