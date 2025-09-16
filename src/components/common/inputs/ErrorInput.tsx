
const ErrorInput = ({ error }: { error?: string }) => {
  return (
    <>
      {" "}
      {error && (
        <div className={`absolute translate-x-1/2 right-1/2 top-[110%] z-[10]`}>
          <div
            className={`  bg-[#E33629] text-white text-center  font-bold text-[16px] px-3 py-1.5 rounded 
            shadow-md whitespace-nowrap`}
          >
            {error}
          </div>
          <div
            className={`absolute w-3 h-3 bg-[#E33629] rotate-45 z-[909] left-1/2 -top-1`}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          />
        </div>
      )}
    </>
  );
};

export default ErrorInput;