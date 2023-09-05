import { World } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

const MarvelConfig = {
  apiKey: process.env.MARVEL_API_KEY,
  hash: process.env.MARVEL_HASH,
};

interface Body {
  characterId: string;
  query: string;
  world: World;
}

const urlObj = (characterId: string, params: string) => ({
  [World.marvel]: `https://gateway.marvel.com:443/v1/public/characters/${characterId}${params}`,
  [World.harry_potter]: `https://hp-api.onrender.com/api/character/${characterId}${params}`,
  [World.naruto]: `https://narutodb.xyz/api/character/${characterId}${params}`,
});

const getUrl = (characterId: string, params: string, world: World) =>
  urlObj(characterId, params)[world];

export async function POST(req: NextRequest) {
  const body: Body = await req.json();

  const paramsObj = {
    [World.marvel]: `?ts=1&apikey=${MarvelConfig.apiKey}&hash=${MarvelConfig.hash}`,
    [World.harry_potter]: "",
    [World.naruto]: "",
  };

  const getParams = (world: World) => paramsObj[world];
  const params = getParams(body.world);
  const url = getUrl(body.characterId, params, body.world);

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
