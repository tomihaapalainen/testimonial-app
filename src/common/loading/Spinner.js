const Spinner = () => {
  return (
    <div>
      <div className="w-5 h-5 bg-gray-600 animate-spin flex justify-center items-center rounded-lg">
        <div className="bg-white w-7 h-7 rounded-full"></div>
      </div>
      <div className="w-5 h-5 bg-gray-600 animate-spin flex justify-center items-center rounded-lg">
        <div className="bg-white w-7 h-7 rounded-full"></div>
      </div>
      <div className="w-5 h-5 bg-gray-600 animate-spin flex justify-center items-center rounded-lg">
        <div className="bg-white w-7 h-7 rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
