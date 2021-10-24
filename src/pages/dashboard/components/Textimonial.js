import pic from "../../../pic.png";

const Textimonial = ({ testimonial }) => {
  return (
    <div className="w-full flex flex-col shadow-lg text-lg">
      <div className="w-full flex justify-start leading-5 p-3 space-x-3 bg-emerald-700 text-white font-bold">
        <div className="w-14 h-14">
          <img className="w-full h-full" src={pic} alt="" />
        </div>
        <div>
          <div className="w-full flex justify-start">
            <p>{testimonial.giver_name}</p>
          </div>
          <div className="w-full flex space-x-1 text-lime-400">
            <p>{testimonial.giver_title}</p>
            {testimonial.business_name && <p>@ {testimonial.business_name}</p>}
          </div>
        </div>
      </div>
      <div className="p-3">
        <span>{testimonial.text}</span>
      </div>
    </div>
  );
};

export default Textimonial;
