import {
  Activities,
  Flights,
  Hotels,
  Immigration,
  Medical,
  Study,
  Vacation,
  Visa,
} from "../icons";
import { ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const navItems = [
  { icon: <Activities />, label: "Activities" },
  {
    icon: <Hotels />,
    label: "Hotels",
  },
  { icon: <Flights />, label: "Flights" },
  {
    icon: <Study />,
    label: "Study",
  },
  {
    icon: <Visa />,
    label: "Visa",
  },
  {
    icon: <Immigration />,
    label: "Immigration",
  },
  {
    icon: <Medical />,
    label: "Medical",
  },
  {
    icon: <Vacation />,
    label: "Vacation Packages",
  },
];

export const Sidebar = () => {
  return (
    <aside className="p-6 bg-white rounded flex flex-col gap-16">
      <div className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href="#"
            className="flex px-[14px] py-3 items-center gap-2"
          >
            {item.icon}
            <span className="text-black-secondary font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="py-[18px] cursor-pointer pl-[14px] pr-[22px] rounded bg-neutral-300 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-primary-600 p-[13px] rounded w-fit h-fit text-white font-medium">
            Go
          </span>
          <p className="text-sm text-black-secondary font-medium">Personal Account</p>
        </div>
        <ChevronsUpDownIcon className="text-neutral-700" />
      </div>
    </aside>
  );
};
