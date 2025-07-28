"use client";

import { CalendarBlank, Gear, UserPlus } from "../icons";
import { Button } from "../ui";
import SearchModal from "../ui/SearchModal";
import { images } from "@/src/constants";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const Header = () => {
  const [modalOptions, setModalOptions] = useState({
    type: "",
    open: false,
  });

  const actions = [
    {
      title: "Activities",
      content:
        "Build, personalize, and optimize your itineraries with our trip planner.",
      buttonVariant: "primary" as const,
      background: "bg-primary-1100",
      onClick: () => setModalOptions({ open: true, type: "activity" }),
    },
    {
      title: "Hotels",
      content:
        "Build, personalize, and optimize your itineraries with our trip planner.",
      buttonVariant: "primary" as const,
      background: "bg-primary-100",
      textColor: "text-black",
      onClick: () => setModalOptions({ open: true, type: "hotel" }),
    },
    {
      title: "Flights",
      content:
        "Build, personalize, and optimize your itineraries with our trip planner.",
      buttonVariant: "secondary" as const,
      background: "bg-primary-600",
      onClick: () => setModalOptions({ open: true, type: "flight" }),
    },
  ];
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <span className="flex w-fit text-secondary-900 bg-secondary-100 py-1 px-2 text-sm font-medium items-center gap-1">
            <CalendarBlank />
            <span>21 March 2024</span>
            <ArrowRight />
            <span>21 March 2024</span>
          </span>
          <h1 className="text-2xl font-semibold text-black">
            Bahamas Family Trip
          </h1>
          <p className="flex text-black-secondary font-medium items-center gap-1">
            <span>New York, United States of America </span>
            <span className="w-[2px] mx-[2px] h-4 bg-neutral-500" />
            <span>Solo Trip</span>
          </p>
        </div>
        <div className="flex gap-1">
          {actions.map((item) => (
            <div
              key={item.title}
              className={`${item.background} ${
                item.textColor || "text-white"
              } max-w-[270px] py-4 px-[14px] rounded flex flex-col justify-between gap-8`}
            >
              <div className="flex flex-col gap-2">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
              <Button onClick={item.onClick} variant={item.buttonVariant}>
                Add {item.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button py={13} px={70} variant="primary-light">
            <UserPlus />
          </Button>
          <MoreHorizontal className="text-neutral-900 cursor-pointer" />
        </div>
        <div className="flex items-center">
          <Image
            src={images.avatar2}
            width={40}
            height={40}
            alt="Display picture"
          />
          <span className="h-[2px] w-[31px] bg-primary-100" />
          <span className="w-fit border-2 border-primary-100 h-fit p-3 rounded-full">
            <Gear />
          </span>
        </div>
      </div>
      <SearchModal
        type={modalOptions.type as any}
        open={modalOptions.open}
        onClose={() => setModalOptions({ open: false, type: "" })}
      />
    </div>
  );
};
