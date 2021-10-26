const ButtonSpinner = () => {
  return (
    <div className="animate-spin flex justify-center items-center space-x-2 px-1">
      <div>
        <div className="bg-white h-1 w-1 rounded-full" />
        <div className="h-2 w-1" />
        <div className="bg-white h-1 w-1 rounded-full" />
      </div>
      <div>
        <div className="bg-white h-1 w-1 rounded-full" />
        <div className="h-2 w-1" />
        <div className="bg-white h-1 w-1 rounded-full" />
      </div>
    </div>
  );
};

export default ButtonSpinner;
