import { Activities } from "./activities";
import { Flights } from "./flights";
import { Hotels } from "./hotels";
import React from "react";

export const TripIteneraries = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-[2px]">
        <h3 className="text-xl font-semibold text-black-primary">
          Trip itineraries
        </h3>
        <p className="text-black-secondary text-sm font-medium">
          Your trip itineraries are placed here
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Flights />
        <Hotels />
        <Activities />
      </div>
    </div>
  );
};
