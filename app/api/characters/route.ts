import { NextRequest, NextResponse } from "next/server";

import { World } from "@/app/types";

const MarvelConfig = {
  apiKey: process.env.MARVEL_API_KEY,
  hash: process.env.MARVEL_HASH,
};

interface Body {
  query: string;
  world: World;
}

const urlObj = (params: string) => ({
  [World.marvel]: `https://gateway.marvel.com:443/v1/public/characters${params}`,
  [World.harry_potter]: `https://hp-api.onrender.com/api/characters${params}`,
  [World.naruto]: `https://www.narutodb.xyz/api/character${params}`,
});

const getUrl = (params: string, world: World) => urlObj(params)[world];

export async function POST(req: NextRequest) {
  const body: Body = await req.json();

  const paramsObj = {
    [World.marvel]: `?ts=1&apikey=${MarvelConfig.apiKey}&hash=${
      MarvelConfig.hash
    }${body.query ? `&${body.query}` : ""}`,
    [World.harry_potter]: "",
    [World.naruto]: body.query ? `?${body.query}` : "",
  };

  const getParams = (world: World) => paramsObj[world];
  const params = getParams(body.world);
  const url = getUrl(params, body.world);

  if (!url) return;

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
