import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children, ...props }) => (
  <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>
);

const Tooltip = ({ className, ...props }) => (
  <TooltipPrimitive.Root {...props} className={cn(className)} />
);

const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = ({ className, ...props }) => (
  <TooltipPrimitive.Content
    sideOffset={5}
    className={cn(
      "rounded-md bg-gray-800 p-2 text-white text-sm shadow-md",
      className
    )}
    {...props}
  />
);

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
};
