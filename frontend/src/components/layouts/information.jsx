import { useNavigate } from "react-router-dom";
import { CarouselOrientation } from "./carousel";

const Information = ({ mode }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex justify-between border shadow-md rounded flex-col md:flex-row md:gap-8 items-center ${
        mode ? "shadow-gray-200 border-gray-200" : "border-gray-700 shadow-gray-800"
      } p-8`}
    >
      <div className="md:w-[50%] w-full">
        <h1 className="text-3xl font-bold font-spaceGrotesk mb-2">
          <span className="text-blue-500">Olovuddin</span> - dasturlash kurslari
        </h1>
        <p>
          Amaliy dasturlash kurslari bilan to'la platformaga xush kelibsiz.
          <br />
          Bu yerda siz barcha pullik kurslarni bepul o'rganishingiz mumkin.
        </p>
        <div className="flex justify-start items-center gap-2 my-2">
          <button
            onClick={() => navigate("/courses")}
            className={`border px-4 py-2 rounded bg-blue-600 ${mode ? "text-white" : "text-darkBlue"} border-none hover:bg-blue-700 transition-all`}
          >
            Kurslar
          </button>
          <button
            onClick={() => navigate("/projects")}
            className={`border px-4 py-2 rounded ${
              mode ? "text-darkBlue bg-light hover:bg-gray-300" : "text-white bg-gray-700 hover:bg-gray-800"
            }  border-none  transition-all`}
          >
            Loyihalar
          </button>
        </div>
        <p className="text-muted-foreground">* Kelajak hayotingiz uchun investitsiya qiling.</p>
      </div>
      <div className="md:w-[45%] w-full">
        <CarouselOrientation />
      </div>
    </div>
  );
};

export default Information;
