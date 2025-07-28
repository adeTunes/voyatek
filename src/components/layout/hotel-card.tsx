import {
  Baggage,
  Bar,
  Bed,
  CalendarBlank,
  Cancel,
  Entertainment,
  Landing,
  Location,
  Meal,
  Naira,
  Pool,
  Star,
  TakeOff,
  USB,
} from "../icons";
import { Carousel } from "./carousel";
import { useItinerary } from "@/src/context/ItineraryContext";
import { Check, Plus } from "lucide-react";
import React from "react";

const getFacilities = (accessibilityLabel: string) => {
  const facilities = [];

  if (accessibilityLabel.includes("Breakfast")) {
    facilities.push({ icon: Meal, text: "Breakfast" });
  }
  if (accessibilityLabel.includes("Pool")) {
    facilities.push({ icon: Pool, text: "Pool" });
  }
  if (accessibilityLabel.includes("Free cancellation")) {
    facilities.push({ icon: Cancel, text: "Free cancellation" });
  }
  if (accessibilityLabel.includes("Bar")) {
    facilities.push({ icon: Bar, text: "Bar" });
  }

  return facilities;
};

export const HotelCard = ({
  hotel,
  isModal,
  onRemove,
}: {
  hotel: any;
  isModal?: boolean;
  onRemove?: () => void;
}) => {
  const facilities = getFacilities(hotel.accessibilityLabel);
  const property = hotel.property;
  const { addItem, items } = useItinerary();

  const isAdded = items.some(
    (item) => item.type === "hotel" && item.data.hotel_id === hotel.hotel_id
  );

  return (
    <div className="grid bg-white rounded grid-cols-[1fr_auto]">
      <div className="flex">
        {/* Hotel Image Carousel */}
        <div className="w-[25%] max-w-[232px] py-6 pl-6">
          <Carousel
            images={
              property.photoUrls
                ? property.photoUrls.map((url: string) => ({ src: url }))
                : [{ src: "" }]
            }
          />
        </div>

        {/* Hotel Details */}
        <div className="flex-1 flex flex-col">
          {/* Hotel Name & Info */}
          <div className="flex py-6 px-4 items-start justify-between">
            <div className="flex flex-col gap-2">
              <p className="flex max-w-[445px] flex-col gap-[2px]">
                <span className="text-xl font-semibold text-black">
                  {property.name}
                </span>
                <span className="text-black-primary font-medium">
                  {hotel.accessibilityLabel.split("\n")[0] || ""}
                </span>
              </p>

              <div className="flex items-center gap-[14px]">
                <span className="flex items-center gap-1">
                  <Location />
                  <span className="font-medium text-primary-600">
                    Show in map
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Star />
                  <span className="font-medium text-black-secondary">
                    {property.reviewScore} ({property.reviewCount})
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Bed />
                  <span className="font-medium text-black-secondary">
                    {property.propertyClass} Star Hotel
                  </span>
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex text-right flex-col gap-1">
              <span className="flex items-center justify-end gap-1">
                <span className="tex-[28px] font-semibold text-black-primary">
                  {property.priceBreakdown.grossPrice.value.toFixed(2)}{" "}
                  {property.priceBreakdown.grossPrice.currency}
                </span>
              </span>
              {/* <span className="text-black-primary font-medium">
                Total Price: {property.currency}
              </span>
              <span className="text-black-primary font-medium">
                1 room x 1 night incl. taxes
              </span> */}
            </div>
          </div>

          {/* Facilities & Dates */}
          <div className="p-6 flex items-center justify-between border-y border-y-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-black-secondary font-medium">
                Facilities:
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {facilities.length > 0 ? (
                  facilities.map((item, index) => (
                    <span
                      key={index}
                      className="flex text-lg font-medium text-black-secondary items-center gap-[6px]"
                    >
                      <item.icon />
                      {item.text}
                    </span>
                  ))
                ) : (
                  <span className="text-black-secondary">Not specified</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex text-lg font-medium text-black-secondary items-center gap-[6px]">
                <CalendarBlank />
                Check In: {property.checkinDate}
              </span>
              <span className="flex text-lg font-medium text-black-secondary items-center gap-[6px]">
                <CalendarBlank />
                Check Out: {property.checkoutDate}
              </span>
            </div>
          </div>

          {!isModal && (
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button className="text-primary-600 cursor-pointer text-lg font-medium">
                  Hotel details
                </button>
                <button className="text-primary-600 cursor-pointer text-lg font-medium">
                  Price details
                </button>
              </div>
              <button className="text-primary-600 cursor-pointer text-lg font-medium">
                Edit details
              </button>
            </div>
          )}
        </div>
      </div>

      {isModal && isAdded ? (
        <div className="px-[11px] rounded-r flex items-center justify-center bg-green-100 duration-200">
          <Check className="text-green-500" />
        </div>
      ) : isModal ? (
        <button
          title="Add to itenary"
          onClick={() => addItem({ type: "hotel", data: hotel })}
          className="px-[11px] cursor-pointer rounded-r flex items-center justify-center bg-primary-100 hover:bg-primary-100/80 duration-200"
        >
          <Cancel className="rotate-45" color="#0d6efd" />
        </button>
      ) : (
        <button
          title="Remove from itenary"
          className="px-[11px] cursor-pointer rounded-r flex items-center justify-center bg-error-100 hover:bg-error-100/80 duration-200"
          onClick={onRemove}
        >
          <Cancel />
        </button>
      )}
    </div>
  );
};
