import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "@/services";

const ProjectCard = ({ image, title, slug, directionCategory, ratingCategory, priceCategory, marginTop = "mt-0" }) => {
  const { mode } = useSelector((state) => state.mode);
  const navigate = useNavigate();
  return (
    <Card
      className="pt-2 bg-transparent text-white border-x-0 border-b-0 rounded-none border-t cursor-pointer border-gray-700 mt-4 relative"
      onClick={() => navigate(`/projects/${slug}`)}
    >
      <div className={`flex items-center justify-between absolute w-[230px] overflow-hidden top-2 left-0 ${marginTop}`}>
        <Button className={"w-[33%] h-[25px] hover:bg-red-950 rounded-[3px] bg-red-900"}>{directionCategory}</Button>
        <Button className={"w-[33%] h-[25px] hover:bg-gray-900 rounded-[3px] bg-gray-800"}>{ratingCategory}</Button>
        <Button className={"w-[33%] h-[25px] hover:bg-blue-900 rounded-[3px] bg-blue-800 text-gray-950"}>{priceCategory}</Button>
      </div>
      <img src={`${IMG_URL}/course-images/${image}`} alt="backend" className="w-full object-cover h-[190px] rounded-sm img-animation" />
      <CardTitle className={`text-xl font-bold font-spaceGrotesk pt-2 ${mode ? "text-black" : "text-white"}`}>{title}</CardTitle>
    </Card>
  );
};

export default ProjectCard;
