import { Cancel, Clock, Location, Naira, Star } from "../icons";
import { Carousel } from "./carousel";
import { useItinerary } from "@/src/context/ItineraryContext";
import { Check, CircleChevronDown, CircleChevronUp, Plus } from "lucide-react";

export const ActivityCard = ({
  activity,
  onRemove,
  isModal,
}: {
  activity: any;
  onRemove?: (data: any) => void;
  isModal?: boolean;
}) => {
  const rating = activity.reviewsStats?.combinedNumericStats?.average || "N/A";
  const reviewsCount = activity.reviewsStats?.combinedNumericStats?.total || 0;
  const city = activity.ufiDetails?.bCityName || "Unknown";
  const image = activity.primaryPhoto?.small || "";
  const price = activity.representativePrice?.chargeAmount || 0;
  const currency = "$";
  const hasFreeCancellation = activity.cancellationPolicy?.hasFreeCancellation;

  const whatsIncluded = activity.flags?.length
    ? activity.flags
        .map((f: any) => f.flag.replace(/([A-Z])/g, " $1"))
        .join(", ")
    : "Admission & Guide";

  const { addItem, items } = useItinerary();

  const isAdded = items.some(
    (item) => item.type === "activity" && item.data.id === activity.id
  );

  return (
    <div className="grid bg-white rounded grid-cols-[1fr_auto]">
      <div className="flex">
        {/* Image Carousel */}
        <div className="w-[25%] max-w-[232px] py-6 pl-6">
          <Carousel images={[{ src: image }]} />
        </div>

        {/* Activity Details */}
        <div className="flex-1 flex flex-col">
          {/* Top Info */}
          <div className="flex py-6 px-4 items-start justify-between">
            <div className="flex flex-col gap-2">
              <p className="flex max-w-[445px] flex-col gap-[2px]">
                <span className="text-xl font-semibold text-black">
                  {activity.name}
                </span>
                <span className="text-black-primary font-medium">
                  {activity.shortDescription}
                </span>
              </p>

              <div className="flex items-center gap-[14px]">
                <span className="flex items-center gap-1">
                  <Location />
                  <span className="font-medium text-primary-600">{city}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Star />
                  <span className="font-medium text-black-secondary">
                    {rating} ({reviewsCount})
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock />
                  <span className="font-medium text-black-secondary">
                    ~3 Hours
                  </span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex text-right flex-col gap-1">
              <span className="flex items-center justify-end gap-1">
                {/* <Naira /> */}
                <span className="tex-[28px] font-semibold text-black-primary">
                  {currency} {price.toLocaleString()}
                </span>
              </span>
              <span className="text-black-primary font-medium">
                {hasFreeCancellation
                  ? "Free Cancellation"
                  : "No Free Cancellation"}
              </span>
              <span className="text-black-primary font-medium">
                Taxes included
              </span>
            </div>
          </div>

          {/* What's Included + Controls */}
          <div className="px-6 py-[14px] flex items-center justify-between border-y border-y-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-black-secondary font-medium">
                What's Included:
              </span>
              <span className="text-black-secondary font-medium">
                {whatsIncluded}
              </span>
              {/* <button className="text-primary-600 cursor-pointer text-lg font-medium">
                See more
              </button> */}
            </div>
            <div className="flex items-center gap-[14px]">
              <span className="py-1 px-2 bg-tag-blue rounded text-xs font-medium text-white">
                Day 1
              </span>
              <div className="flex text-neutral-600 flex-col gap-[10px]">
                <CircleChevronUp size={20} />
                <CircleChevronDown size={20} />
              </div>
            </div>
          </div>

          {!isModal && (
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button className="text-primary-600 cursor-pointer text-lg font-medium">
                  Activity details
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
          onClick={() => addItem({ type: "activity", data: activity })}
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
