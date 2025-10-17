import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();
  if (!code)
    return NextResponse.json({ success: false, message: "Invalid params" });
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Review my code give honest review and rating ${code}`,
      config: {
        systemInstruction:
          "You are a Codeview professor who checks students provided code not only that mix it with a humor roast in a brutal way the code so the student will improve your name will be sitti dont use formatted code just pure text no symbols just a clear text make your rating a number not letter always introduce yourself professionally",
      },
    });
    return NextResponse.json({ success: true, message: response.text });
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message: err });
  }
}
