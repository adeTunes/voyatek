import {
  Baggage,
  Cancel,
  Entertainment,
  Landing,
  Meal,
  Naira,
  TakeOff,
  USB,
} from "../icons";
import { images } from "@/src/constants";
import { useItinerary } from "@/src/context/ItineraryContext";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const facilities = [
  {
    icon: Baggage,
    text: "Baggage: 20kg, Cabin Baggage: 8kg",
  },
  {
    icon: Entertainment,
    text: "In flight entertainment",
  },
  {
    icon: Meal,
    text: "In flight meal",
  },
  {
    icon: USB,
    text: "USB Port",
  },
];

export const FlightCard = ({
  flight,
  isModal,
  onRemove,
}: {
  flight: any;
  isModal?: boolean;
  onRemove?: () => void;
}) => {
  const firstSegment = flight.segments[0];
  const firstLeg = firstSegment.legs[0];
  const lastLeg = firstSegment.legs[firstSegment.legs.length - 1];
  const carrier = firstLeg.carriersData?.[0];
  const airlineName = carrier?.name || "Unknown Airline";
  const airlineLogo = carrier?.logo || images.airlineLogo;
  const flightNumber = firstLeg.flightInfo?.flightNumber || "N/A";
  const cabinClass = firstLeg.cabinClass || "Economy";
  const fromCode = firstLeg.departureAirport?.code;
  const toCode = lastLeg.arrivalAirport?.code;
  const depTime = new Date(firstLeg.departureTime);
  const arrTime = new Date(lastLeg.arrivalTime);
  const price = flight.priceBreakdown.total;
  const featureMap: Record<any, any> = {
    PERSONAL_BAGGAGE: { icon: Baggage, text: "Personal item" },
    CABIN_BAGGAGE: { icon: Baggage, text: "Cabin baggage" },
    CHECK_BAGGAGE: { icon: Baggage, text: "Checked baggage" },
    IN_FLIGHT_MEAL: { icon: Meal, text: "In flight meal" },
    IN_FLIGHT_ENTERTAINMENT: {
      icon: Entertainment,
      text: "In flight entertainment",
    },
    USB_PORT: { icon: USB, text: "USB Port" },
  };

  const brandedFeatures = flight.brandedFareInfo?.features || [];
  const mappedFacilities = brandedFeatures
    .map((feat: any) => featureMap[feat.featureName])
    .filter(Boolean);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (d: Date) => d.toDateString().slice(0, 10);
  const formatCurrency = (p: any) => {
    const total = p.units + p.nanos / 1e9;
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: p.currencyCode,
    });
  };

  const { addItem, items } = useItinerary();

  const isAdded = items.some(
    (item) => item.type === "flight" && item.data.token === flight.token
  );

  return (
    <div className="grid bg-white rounded grid-cols-[1fr_auto]">
      <div className="flex flex-col">
        <div className="p-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={airlineLogo} alt="airline logo" width={24} height={24} />
            <div className="flex flex-col gap-1">
              <h5 className="text-xl font-semibold text-black-primary">
                {airlineName}
              </h5>
              <span className="flex items-center">
                <span className="text-black-secondary font-medium">
                  #{flightNumber}
                </span>
                <span className="text-lg px-2 text-neutral-700">.</span>
                <span className="rounded text-white py-1 px-2 bg-tag-blue text-xs font-medium">
                  {cabinClass}
                </span>
              </span>
            </div>
          </div>

          <div className="flex w-[45%] items-center gap-7">
            <div className="flex flex-col gap-[2px]">
              <h5 className="text-2xl text-black-primary font-semibold text-right">
                {formatTime(depTime)}
              </h5>
              <span className="text-black-secondary text-sm font-medium">
                {formatDate(depTime)}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-[11px]">
              <div className="flex w-full items-center justify-between">
                <TakeOff />
                <span className="text-black-secondary font-medium">
                  Duration: {(firstSegment.totalTime / 3600).toFixed(1)}h
                </span>
                <Landing />
              </div>
              <div className="w-full relative bg-primary-100 h-2 rounded-lg">
                <div className="absolute top-0 bottom-0 right-0 left-0 mx-auto w-[35%] bg-primary-600 rounded-lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black-primary font-semibold">
                  {fromCode}
                </span>
                <span className="text-black-secondary font-medium">Direct</span>
                <span className="text-black-primary font-semibold">
                  {toCode}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-[2px]">
              <h5 className="text-2xl text-black-primary font-semibold">
                {formatTime(arrTime)}
              </h5>
              <span className="text-black-secondary text-sm font-medium">
                {formatDate(arrTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* <Naira /> */}
            <span className="text-black-primary font-semibold text-[28px]">
              {formatCurrency(price)}
            </span>
          </div>
        </div>

        <div className="p-6 flex items-center gap-3 border-y border-y-neutral-400">
          <span className="text-black-secondary font-medium">Facilities:</span>
          <div className="flex flex-wrap items-center gap-4">
            {mappedFacilities.length > 0 ? (
              mappedFacilities.map((item: any, index: number) => (
                <span
                  key={index}
                  className="flex text-lg font-medium text-black-secondary items-center gap-[6px]"
                >
                  <item.icon />
                  {item.text}
                </span>
              ))
            ) : (
              <span className="text-black-secondary text-sm">
                No listed facilities
              </span>
            )}
          </div>
        </div>

        {!isModal && (
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button className="text-primary-600 cursor-pointer text-lg font-medium">
                Flight details
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
      {isModal && isAdded ? (
        <div className="px-[11px] rounded-r flex items-center justify-center bg-green-100 duration-200">
          <Check className="text-green-500" />
        </div>
      ) : isModal ? (
        <button
          title="Add to itenary"
          onClick={() => addItem({ type: "flight", data: flight })}
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
