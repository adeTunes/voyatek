import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dest_id = searchParams.get("dest_id");
  const search_type = searchParams.get("search_type");
  const arrival_date = searchParams.get("arrival_date");
  const departure_date = searchParams.get("departure_date");
  if (!dest_id || !search_type || !arrival_date || !departure_date)
    return new Response(JSON.stringify([]), { status: 400 });
  const params = {
    dest_id,
    search_type,
    arrival_date,
    departure_date,
    adults: "1",
  };
  console.log(JSON.stringify(params));
  try {
    const response = await axios.get(
      "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
      {
        params,
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
        },
      }
    );
    console.log(JSON.stringify(response.data));
    return new Response(
      JSON.stringify(response.data?.data?.hotels || []),
      { status: 200 }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    return new Response(JSON.stringify({ error: "Failed to fetch hotels" }), {
      status: 500,
    });
  }
}
