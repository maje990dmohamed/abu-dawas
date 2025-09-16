import noData from '../../assets/icons/emptyPage.svg'
const EmptyPage = () => {
  return (
    <div className=" w-full">
      <img
        src={noData}
        alt=""
        width={1000}
        height={1000}
        className="w-[450px] mx-auto lg:w-[450px] lg:h-[450px]"
      />
      <div className="flex flex-col gap-6">
        <p className="text-center text-[#000000] text-[15px] sm:text-[48px] capitalize font-[700] mt-4">
          {"لا يوجد بيانات"}
        </p>
      </div>
    </div>
  );
};

export default EmptyPage;
