"use client";

import { Flights2 } from "../icons";
import { EmptyFlight } from "../icons/empty-flight";
import { Button } from "../ui";
import SearchModal from "../ui/SearchModal";
import { FlightCard } from "./flight-card";
import { useItinerary } from "@/src/context/ItineraryContext";
import React, { useState } from "react";

export const Flights = () => {
  const [open, setOpen] = useState(false);
  const { items, removeItem } = useItinerary();

  const flightItems = items.filter((item) => item.type === "flight");

  return (
    <div className="bg-neutral-300 px-6 py-4 rounded flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[10px]">
          <Flights2 />
          <span className="text-lg text-black-primary font-semibold">
            Flights
          </span>
        </span>
        {!!flightItems.length && (
          <Button variant="secondary" px={39} onClick={() => setOpen(true)}>
            Add Flights
          </Button>
        )}
      </div>
      {flightItems.length ? (
        flightItems.map(({ data }, idx) => (
          <FlightCard
            onRemove={() => removeItem(idx)}
            flight={data}
            key={idx}
          />
        ))
      ) : (
        <div className="bg-white flex items-center justify-center h-[286px]">
          <div className="flex flex-col items-center gap-2">
            <EmptyFlight />
            <span className="text-sm font-medium text-black-primary">
              No Request yet
            </span>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Add Flights
            </Button>
          </div>
        </div>
      )}
      <SearchModal type="flight" open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
