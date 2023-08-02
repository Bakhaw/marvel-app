import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: body.prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0,
      n: 1,
    });

    const response = completion.data.choices[0].message?.content;

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
