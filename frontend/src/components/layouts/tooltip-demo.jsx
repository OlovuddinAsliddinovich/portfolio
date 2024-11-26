import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipDemo({ mode, BiMessageDetail, setCommentModal }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setCommentModal(true)}
            className={`flex items-center justify-between gap-2 px-2 h-[35px] rounded-[2px] ${
              mode ? "text-gray-700 bg-gray-200 hover:bg-gray-300" : "text-gray-200 bg-gray-700 hover:bg-gray-800"
            }`}
          >
            <BiMessageDetail className="text-md mt-1" /> <span>Sharhlar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-blue-400 text-white rounded-[3px] w-auto font-spaceGrotesk border-none text-[13px] px-1 py-0">
          Barcha Sharhlar
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
