import { Banner } from "./banner";
import { Header } from "./header";
import { TripIteneraries } from "./trip-iteneraries";

export const MainContent = () => {
  return (
    <div className="flex-1 overflow-auto flex flex-col gap-20 p-8 bg-white rounded">
      <div className="flex flex-col gap-5">
        <Banner />
        <Header />
      </div>
      <TripIteneraries />
    </div>
  );
};
