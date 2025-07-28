import {
  Basket,
  CaretDown,
  ChartPieSlice,
  Bell,
  PlusSquare,
  HandCoins,
  Home,
  ListChecks,
  Wallet,
} from "../icons";
import { Button } from "../ui";
import { images } from "@/src/constants";
import { Search } from "lucide-react";
import Image from "next/image";

const navItems = [
  { icon: <Home />, label: "Home" },
  {
    icon: <ChartPieSlice />,
    label: "Dashboard",
  },
  { icon: <Wallet />, label: "Wallet" },
  {
    icon: <ListChecks />,
    label: "Plan a trip",
  },
  {
    icon: <HandCoins />,
    label: "Commission for life",
  },
];
const actionItems = [
  { icon: <Bell />, label: "Notification" },
  { icon: <Basket />, label: "Carts" },
  { icon: <PlusSquare />, label: "Create" },
];

export function Navigation() {
  return (
    <nav className="w-full py-8 px-10 bg-white flex items-center justify-between">
      <div className="flex items-center gap-7">
        <div className="p-2 w-fit h-fit bg-primary-600 rounded">
          <Image src={images.logo} alt="" />
        </div>
        <div className="flex items-center gap-2 bg-neutral-300 rounded py-4 px-3 w-[400px]">
          <Search className="w-6 h-6 text-neutral-700" />
          <input
            placeholder="Search"
            className="flex-1 bg-transparent border-0 outline-0"
          />
        </div>
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-start gap-6">
          {navItems.map((item, index) => (
            <div key={index} className="flex text-black-secondary flex-col items-center gap-2">
              {item.icon}
              <span className="font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-px h-12 bg-gray-200"></div>
        <Button variant="primary" py={9}>
          Subscribe
        </Button>

        <div className="flex items-center gap-6">
          {actionItems.map((item, index) => (
            <div key={index} className="flex text-black-secondary flex-col items-center gap-2">
              {item.icon}
              <span className="font-medium">
                {item.label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-[15px]">
            <Image
              src={images.avatar1}
              alt="User profile"
              className="rounded-full object-cover"
              height={52}
              width={52}
            />
            <CaretDown />
          </div>
        </div>
      </div>
    </nav>
  );
}
