import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  button1,
  button2,
  button3,
  img,
  title,
  slug,
  marginTop = "mt-0",
}) => {
  const { mode } = useSelector((state) => state.mode);
  const navigate = useNavigate();
  return (
    <Card
      className="pt-2 bg-transparent text-white border-x-0 border-b-0 rounded-none border-t cursor-pointer border-gray-700 mt-4 relative"
      onClick={() => navigate(`/courses/${slug}`)}
    >
      <div
        className={`flex items-center justify-between absolute top-2 left-0 ${marginTop}`}
      >
        <Button
          className={
            "w-auto h-[25px] hover:bg-red-950 rounded-[3px] bg-red-900"
          }
        >
          {button1}
        </Button>
        <Button
          className={
            "w-auto h-[25px] hover:bg-gray-900 rounded-[3px] bg-gray-800"
          }
        >
          {button2}
        </Button>
        <Button
          className={
            "w-auto h-[25px] hover:bg-blue-900 rounded-[3px] bg-blue-800 text-gray-950"
          }
        >
          {button3}
        </Button>
      </div>
      <img
        src={img}
        alt="backend"
        className="w-full object-cover h-[190px] rounded-sm img-animation"
      />
      <CardTitle
        className={`text-xl font-bold font-spaceGrotesk pt-2 ${
          mode ? "text-black" : "text-white"
        }`}
      >
        {title}
      </CardTitle>
    </Card>
  );
};

export default CourseCard;
