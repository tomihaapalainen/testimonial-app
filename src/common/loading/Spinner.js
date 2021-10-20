const Spinner = () => {
  return (
    <div className="animate-bounce">
      <div className="w-4 h-4 bg-gray-600 animate-spin flex justify-center items-center rounded-lg">
        <div className="bg-gray-800 w-6 h-6 rounded-md"></div>
      </div>
      <div className="w-4 h-4 bg-gray-600 animate-spin flex justify-center items-center rounded-lg">
        <div className="bg-gray-800 w-6 h-6 rounded-md"></div>
      </div>
      <div className="w-4 h-4 bg-gray-600 animate-spin flex justify-center items-center rounded-lg">
        <div className="bg-gray-800 w-6 h-6 rounded-md"></div>
      </div>
    </div>
  );
};

export default Spinner;
