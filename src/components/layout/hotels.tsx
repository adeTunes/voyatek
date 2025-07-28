"use client";

import { Hotel } from "../icons";
import { EmptyHotel } from "../icons/empty-hotel";
import { Button } from "../ui";
import SearchModal from "../ui/SearchModal";
import { HotelCard } from "./hotel-card";
import { useItinerary } from "@/src/context/ItineraryContext";
import React, { useState } from "react";

export const Hotels = () => {
  const [open, setOpen] = useState(false);
  const { items, removeItem } = useItinerary();

  const hotelItems = items.filter((item) => item.type === "hotel");

  return (
    <div className="bg-neutral-900 px-6 py-4 rounded flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[10px]">
          <Hotel />
          <span className="text-lg text-white font-semibold">Hotels</span>
        </span>
        {!!hotelItems.length && (
          <Button
            variant="secondary-black"
            px={40}
            onClick={() => setOpen(true)}
          >
            Add Hotels
          </Button>
        )}
      </div>
      {hotelItems.length ? (
        hotelItems.map(({ data }, idx) => (
          <HotelCard onRemove={() => removeItem(idx)} hotel={data} key={idx} />
        ))
      ) : (
        <div className="bg-white flex items-center justify-center h-[286px]">
          <div className="flex flex-col items-center gap-2">
            <EmptyHotel />
            <span className="text-sm font-medium text-black-primary">
              No Request yet
            </span>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Add Hotels
            </Button>
          </div>
        </div>
      )}
      <SearchModal type="hotel" open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
