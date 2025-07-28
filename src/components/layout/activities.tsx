"use client";

import { ActivitiesSm } from "../icons/activities-sm";
import { EmptyActivity } from "../icons/empty-activity";
import { Button } from "../ui";
import SearchModal from "../ui/SearchModal";
import { ActivityCard } from "./activity-card";
import { useItinerary } from "@/src/context/ItineraryContext";
import React, { useState } from "react";

export const Activities = () => {
  const [open, setOpen] = useState(false);
  const { items, removeItem } = useItinerary();
  const activityItems = items.filter((item) => item.type === "activity");
  return (
    <div className="bg-primary-700 px-6 py-4 rounded flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[10px]">
          <ActivitiesSm />
          <span className="text-lg text-white font-semibold">Activities</span>
        </span>
        {!!activityItems.length && (
          <Button variant="secondary" px={31} onClick={() => setOpen(true)}>
            Add Activities
          </Button>
        )}
      </div>
      {activityItems.length ? (
        activityItems.map(({ data }, idx) => (
          <ActivityCard
            onRemove={() => removeItem(idx)}
            activity={data}
            key={idx}
          />
        ))
      ) : (
        <div className="bg-white flex items-center justify-center h-[286px]">
          <div className="flex flex-col items-center gap-2">
            <EmptyActivity />
            <span className="text-sm font-medium text-black-primary">
              No Request yet
            </span>
            <Button variant="primary" onClick={() => setOpen(true)}>
              Add Activity
            </Button>
          </div>
        </div>
      )}
      <SearchModal type="activity" open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
