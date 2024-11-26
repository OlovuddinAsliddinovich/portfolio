import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PiCaretUpDown } from "react-icons/pi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { secondsToMinutes } from "@/hooks";

export function AccordionDemo({ modules }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {modules.map((module) => (
        <AccordionItem value={module?._id} key={module?._id}>
          <AccordionTrigger className={"hover:no-underline flex justify-between w-full "}>
            <div className="flex items-center justify-start gap-2 ">
              <PiCaretUpDown /> <span className="text-start">{module.title}</span>{" "}
            </div>
            <div className="flex justify-end gap-4 items-center ">
              <span>{module?.videos?.length}.darslik</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-l-2 border-blue-500 pl-4 ">
            {module?.videos?.length > 0 ? (
              module?.videos?.map((item) => (
                <div
                  className="flex justify-between items-center hover:text-gray-400 transition-all py-3 cursor-pointer font-montserrat"
                  key={item?._id}
                >
                  <div className="flex items-center gap-2  duration-100">
                    <BsFillCameraVideoFill />
                    <span># {item.title}</span>
                  </div>
                  <div>{secondsToMinutes(item.duration)}</div>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center py-3 cursor-pointer font-montserrat">
                <div className="flex items-center gap-2 hover:text-gray-400 transition-all duration-100">
                  <span>Video mavjud emas</span>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
