import { FaAngleRight } from "react-icons/fa";

const PointerRoute = ({ text }) => {
  return (
    <h1 className="text-2xl font-semibold font-spaceGrotesk mt-4 mb-2 flex justify-start duration-300 gap-2 group items-center cursor-pointer">
      <span>{text}</span>
      <FaAngleRight className="text-[20px] font-bold group-hover:translate-x-1 text-blue-600 transition-all" />
    </h1>
  );
};

export default PointerRoute;
