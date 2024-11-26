"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";

const frameworks = [
  {
    value: "yangi",
    label: "Yangi kurslar",
  },
  {
    value: "oldingi",
    label: "Oldingi kurslar",
  },
  {
    value: "mashxur",
    label: "Mashxur kurslar",
  },
];

export function ComboboxDemo({ setSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { mode } = useSelector((state) => state.mode);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full md:w-[200px] border-none rounded-none h-[35px] ${
            mode ? "bg-gray-200 hover:bg-gray-100 text-gray-500 hover:text-gray-800" : "bg-gray-800 hover:bg-gray-800 text-gray-300 hover:text-white"
          } flex justify-between items-center transition-all duration-200 rounded-sm`}
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : "Filter"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-none">
        <Command className="border-transparent bg-transparent rounded-none">
          <CommandList className="border-transparent">
            <CommandGroup
              className={`rounded-none ${mode ? "bg-gray-100 border border-gray-700 text-black" : "bg-gray-950 border border-gray-700 text-white"}`}
            >
              {frameworks.map((framework) => (
                <CommandItem
                  className={cn(
                    `flex justify-between flex-row-reverse bg-transparent ${mode ? "hover:bg-gray-200" : "hover:bg-gray-700"}`,
                    value === framework.value ? (mode ? "bg-gray-200" : "bg-gray-700") : "bg-transparent"
                  )}
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSelect(currentValue);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
