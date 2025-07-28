"use client";

import { ActivityCard } from "../layout/activity-card";
import { FlightCard } from "../layout/flight-card";
import { HotelCard } from "../layout/hotel-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, FormEvent, useEffect, useRef } from "react";

interface SearchModalProps {
  type: "flight" | "hotel" | "activity";
  open: boolean;
  onClose: () => void;
}

interface LocationOption {
  id: string;
  name: string;
  code?: string;
  search_type?: string;
}

// Custom Async Select Component (vanilla implementation)
interface AsyncSelectProps {
  placeholder: string;
  value: string;
  onSelect: (option: LocationOption) => void;
  endpoint: string;
  icon?: string;
  disabled?: boolean;
}

function AsyncSelect({
  placeholder,
  value,
  onSelect,
  endpoint,
  icon,
  disabled,
}: AsyncSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search
  useEffect(() => {
    if (!inputValue || inputValue.length < 2) {
      setOptions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        console.log("Searching for:", inputValue, "on endpoint:", endpoint);

        const response = await axios.get(endpoint, {
          params: { query: inputValue },
          headers: {
            "X-RapidAPI-Key":
              process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "your-api-key-here",
            "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
          },
        });

        console.log("API Response:", response.data);

        // Transform response based on endpoint
        let transformedOptions: LocationOption[] = [];
        if (endpoint.includes("flights/searchDestination")) {
          transformedOptions =
            response.data.data?.map((item: any) => ({
              id: item.id,
              name: `${item.name} (${item.code})`,
              code: item.code,
            })) || [];
        } else if (endpoint.includes("hotels/searchDestination")) {
          transformedOptions =
            response.data.data?.map((item: any) => ({
              id: item.dest_id,
              name: item.name,
              search_type: item.search_type,
            })) || [];
        } else if (endpoint.includes("attraction/searchLocation")) {
          transformedOptions =
            response.data.data?.destinations?.map((item: any) => ({
              id: item.id,
              name: item.cityName || item.country,
            })) || [];
        }

        console.log("Transformed options:", transformedOptions);
        setOptions(transformedOptions);
      } catch (error) {
        console.error("Search error:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, endpoint]);

  const handleInputClick = () => {
    setIsOpen(true);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionSelect = (option: LocationOption) => {
    onSelect(option);
    setIsOpen(false);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="async-select-container" ref={dropdownRef}>
      <div className="input-wrapper">
        {/* {icon && <span className="input-icon">{icon}</span>} */}
        <input
          ref={inputRef}
          type="text"
          className="async-select-input border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2"
          placeholder={
            isOpen && !value
              ? `Search ${placeholder.toLowerCase()}...`
              : value || placeholder
          }
          value={isOpen ? inputValue : value ? value : ""}
          onChange={handleInputChange}
          onClick={handleInputClick}
          disabled={disabled}
          autoComplete="off"
        />
        {/* <span className="dropdown-arrow">▼</span> */}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {loading && (
            <div className="dropdown-item loading-item">🔄 Searching...</div>
          )}
          {!loading && options.length === 0 && inputValue.length >= 2 && (
            <div className="dropdown-item no-results">
              No results found for "{inputValue}"
            </div>
          )}
          {!loading && inputValue.length < 2 && (
            <div className="dropdown-item no-results">
              Type at least 2 characters to search
            </div>
          )}
          {!loading && options.length > 0 && (
            <>
              {options.map((option) => (
                <div
                  key={option.id}
                  className="dropdown-item cursor-pointer p-1 hover:bg-[#f4f5f6] option-item"
                  onClick={() => handleOptionSelect(option)}
                >
                  📍 {option.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Simple Date Picker Component
interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder: string;
  disabled?: boolean;
  min?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder,
  disabled,
  min,
}: DatePickerProps) {
  return (
    <div className="date-picker-wrapper">
      {/* <span className="input-icon">📅</span> */}
      <input
        type="date"
        className="date-input border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        min={min || new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}

export default function SearchModal({ type, open, onClose }: SearchModalProps) {
  if (!open) return null;

  const [search, setSearch] = useState<any>({});

  // Form state for better UX
  const [formData, setFormData] = useState({
    // Flight fields
    fromLocation: "",
    toLocation: "",
    flightDate: "",

    // Hotel fields
    hotelDestination: "",
    arrivalDate: "",
    departureDate: "",

    // Activity fields
    activityLocation: "",
    activityDate: "",
  });

  // Default params for initial fetch
  const defaultParams = {
    flight: {
      from: "LOS.AIRPORT",
      to: "JFK.AIRPORT",
      date: new Date().toISOString().slice(0, 10),
    },
    hotel: {
      dest_id: "-2092174",
      search_type: "CITY",
      arrival_date: new Date().toISOString().slice(0, 10),
      departure_date: new Date(Date.now() + 86400000)
        .toISOString()
        .slice(0, 10),
    },
    activity: {
      id: "eyJ1ZmkiOi0yMDkyMTc0fQ==",
    },
  };

  const apiRoute =
    type === "flight"
      ? "/api/flights"
      : type === "hotel"
      ? "/api/hotels"
      : "/api/activities";

  const { data, isLoading, error, refetch } = useQuery<any[], Error>({
    queryKey: [type, search],
    queryFn: async () => {
      const params = Object.keys(search).length ? search : defaultParams[type];
      const res = await axios.get(apiRoute, { params });
      return res.data;
    },
    enabled: open,
  });

  // Handle form submission
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let searchParams = {};

    if (type === "flight") {
      searchParams = {
        from: search.from || defaultParams.flight.from,
        to: search.to || defaultParams.flight.to,
        date: formData.flightDate || defaultParams.flight.date,
      };
    } else if (type === "hotel") {
      searchParams = {
        dest_id: search.dest_id || defaultParams.hotel.dest_id,
        search_type: search.search_type || defaultParams.hotel.search_type,
        arrival_date: formData.arrivalDate || defaultParams.hotel.arrival_date,
        departure_date:
          formData.departureDate || defaultParams.hotel.departure_date,
      };
    } else if (type === "activity") {
      searchParams = {
        id: search.id || defaultParams.activity.id,
        date: formData.activityDate,
      };
    }

    console.log("Search params:", searchParams);
    setSearch({ ...defaultParams[type], searchParams });
    refetch();
  };

  // Handle location selections
  const handleFromLocationSelect = (option: LocationOption) => {
    console.log("From location selected:", option);
    setFormData((prev) => ({
      ...prev,
      ...defaultParams[type],
      fromLocation: option.name,
    }));
    setSearch((prev: any) => ({
      ...prev,
      ...defaultParams[type],
      from: option.code || option.id,
    }));
  };

  const handleToLocationSelect = (option: LocationOption) => {
    console.log("To location selected:", option);
    setFormData((prev) => ({
      ...prev,
      ...defaultParams[type],
      toLocation: option.name,
    }));
    setSearch((prev: any) => ({
      ...prev,
      ...defaultParams[type],
      to: option.code || option.id,
    }));
  };

  const handleHotelDestinationSelect = (option: LocationOption) => {
    console.log("Hotel destination selected:", option);
    setFormData((prev) => ({
      ...prev,
      ...defaultParams[type],
      hotelDestination: option.name,
    }));
    setSearch((prev: any) => ({
      ...prev,
      ...defaultParams[type],
      dest_id: option.id,
      search_type: option.search_type || "CITY",
    }));
  };

  const handleActivityLocationSelect = (option: LocationOption) => {
    console.log("Activity location selected:", option);
    setFormData((prev) => ({
      ...prev,
      ...defaultParams[type],
      activityLocation: option.name,
    }));
    setSearch((prev: any) => ({
      ...prev,
      ...defaultParams[type],
      id: option.id,
    }));
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h3 className="modal-title">
          Search {type.charAt(0).toUpperCase() + type.slice(1)}
        </h3>

        <form onSubmit={handleSearch} className="search-form">
          {type === "flight" && (
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">From</label>
                <AsyncSelect
                  placeholder="Departure city"
                  value={formData.fromLocation}
                  onSelect={handleFromLocationSelect}
                  endpoint="https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination"
                  icon="✈️"
                />
              </div>
              <div className="form-field">
                <label className="field-label">To</label>
                <AsyncSelect
                  placeholder="Destination city"
                  value={formData.toLocation}
                  onSelect={handleToLocationSelect}
                  endpoint="https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination"
                  icon="🏁"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Date</label>
                <DatePicker
                  value={formData.flightDate}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, flightDate: date }))
                  }
                  placeholder="Select departure date"
                />
              </div>
            </div>
          )}

          {type === "hotel" && (
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">Destination</label>
                <AsyncSelect
                  placeholder="Hotel destination"
                  value={formData.hotelDestination}
                  onSelect={handleHotelDestinationSelect}
                  endpoint="https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination"
                  icon="🏨"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Check-in</label>
                <DatePicker
                  value={formData.arrivalDate}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, arrivalDate: date }))
                  }
                  placeholder="Select check-in date"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Check-out</label>
                <DatePicker
                  value={formData.departureDate}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, departureDate: date }))
                  }
                  placeholder="Select check-out date"
                  disabled={!formData.arrivalDate}
                  min={formData.arrivalDate}
                />
              </div>
            </div>
          )}

          {type === "activity" && (
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">Location</label>
                <AsyncSelect
                  placeholder="Activity location"
                  value={formData.activityLocation}
                  onSelect={handleActivityLocationSelect}
                  endpoint="https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation"
                  icon="🎯"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Date</label>
                <DatePicker
                  value={formData.activityDate}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, activityDate: date }))
                  }
                  placeholder="Select activity date"
                />
              </div>
            </div>
          )}

          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? "🔄 Searching..." : "🔍 Search"}
          </button>
        </form>

        {error && (
          <div className="error-message">
            ⚠️ Error loading {type}s. Please try again.
          </div>
        )}

        <div className="results">
          <div className="result-card flex flex-col gap-4">
            {type === "flight"
              ? data?.map((flight, index) => (
                  <FlightCard isModal key={index} flight={flight} />
                ))
              : type === "hotel"
              ? data?.map((hotel, index) => (
                  <HotelCard isModal key={index} hotel={hotel} />
                ))
              : data?.map((activity, index) => (
                  <ActivityCard isModal key={index} activity={activity} />
                ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          min-width: 400px;
          width: 90vw;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .close-btn:hover {
          background-color: #f3f4f6;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .search-form {
          margin-bottom: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .field-label {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .async-select-container {
          position: relative;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          z-index: 1;
          font-size: 1rem;
        }

        .async-select-input {
          width: 100%;
          padding: 0.75rem 2rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .async-select-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          cursor: text;
        }

        .async-select-input:disabled {
          background-color: #f9fafb;
          cursor: not-allowed;
        }

        .dropdown-arrow {
          position: absolute;
          right: 0.75rem;
          font-size: 0.75rem;
          color: #6b7280;
          pointer-events: none;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-height: 200px;
          overflow-y: auto;
        }

        .dropdown-item {
          padding: 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
          border-bottom: 1px solid #f3f4f6;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .option-item:hover {
          background-color: #f3f4f6;
        }

        .loading-item {
          color: #6b7280;
          cursor: default;
        }

        .no-results {
          color: #6b7280;
          cursor: default;
          font-style: italic;
        }

        .date-picker-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .date-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .date-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .date-input:disabled {
          background-color: #f9fafb;
          cursor: not-allowed;
        }

        .search-button {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .search-button:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .search-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .results {
          max-height: 60vh;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal {
            margin: 1rem;
            width: calc(100vw - 2rem);
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}
