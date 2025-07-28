import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  if (!from || !to || !date)
    return new Response(JSON.stringify([]), { status: 400 });
  try {
    const params = {
      fromId: from,
      toId: to,
      departDate: date,
      adults: 1,
      cabinClass: "ECONOMY",
    };
    console.log(JSON.stringify(params));
    const response = await axios.get(
      "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights",
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
      JSON.stringify(response.data?.data?.flightOffers || []),
      { status: 200 }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    return new Response(JSON.stringify({ error: "Failed to fetch flights" }), {
      status: 500,
    });
  }
}
