import { NextResponse } from "next/server";

const MarvelConfig = {
  apiKey: process.env.MARVEL_API_KEY,
  hash: process.env.MARVEL_HASH,
};

export async function GET(req: Request) {
  const params = `?ts=1&apikey=${MarvelConfig.apiKey}&hash=${MarvelConfig.hash}&offset=600`;
  const url = `https://gateway.marvel.com:443/v1/public/characters${params}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    }).then((res) => res.json());

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error,
    });
  }
}
