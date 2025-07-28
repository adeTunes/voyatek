import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response(JSON.stringify([]), { status: 400 });
  try {
    const response = await axios.get(
      "https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions",
      {
        params: {
          id,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
        },
      }
    );
    return new Response(
      JSON.stringify(response.data?.data?.products || []),
      { status: 200 }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    return new Response(
      JSON.stringify({ error: "Failed to fetch activities" }),
      { status: 500 }
    );
  }
}
