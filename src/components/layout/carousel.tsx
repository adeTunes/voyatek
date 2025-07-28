"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

type CarouselImage = { src: string; alt?: string; id?: string | number };
type CarouselProps = {
  images: CarouselImage[];
  showIndicators?: boolean;
  showCounterLabel?: boolean;
};

const defaultImages: CarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Beautiful landscape",
    id: "default-1",
  },
  {
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Beautiful landscape",
    id: "default-2",
  },
];

export const Carousel = ({
  images,
  showIndicators = false,
  showCounterLabel = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative h-64 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {(images || defaultImages).map((image, index) => (
            <div key={index} className="w-full rounded h-full flex-shrink-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {showCounterLabel && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {showIndicators && (
        <div className="flex justify-center space-x-2 py-4 bg-gray-50">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-blue-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
};
