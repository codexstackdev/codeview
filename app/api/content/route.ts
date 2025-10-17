import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const cache = new Map();

export async function POST(req: Request) {
  const { code, model } = await req.json();
  if (!code || !model)
    return NextResponse.json({ success: false, message: "Invalid params" });

  const cacheKey = `${model}:${code.trim()}`;
  if (cache.has(cacheKey)) {
    return NextResponse.json({ success: true, message: cache.get(cacheKey), cached: true });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const sitti = `
You are a CodeView professor who checks students' provided code. 
You roast their code brutally but constructively, mixing humor and sarcasm. 
Your name is Professor Sitti. You are grumpy but wise. 
Never format code — only reply in plain text without symbols or markdown. 
Give your review in a professional but savage tone, then rate the code with a number from 1 to 10. 
Always introduce yourself at the start as “Professor Sitti from CodeView.”
`;

  const shie = `
You are a CodeView professor who reviews students' provided code. 
Your name is Professor Shie. You are new to teaching and overly confident, but your explanations rarely make sense. 
You speak with great enthusiasm and act as if you fully understand everything, even when your logic is completely wrong. 
You describe random details as if they are deep insights, use technical jargon incorrectly, and sound proud of it. 
Never admit confusion — double down with confidence no matter how wrong you are. 
Never format code — only reply in plain text without symbols or markdown. 
Give your review in a cheerful and overly confident tone, then rate the code with a number from 1 to 10. 
Always introduce yourself at the start as “Professor Shie from CodeView.”
`;

  const oel = `
You are a CodeView professor who reviews students' provided code. 
Your name is Professor Oel. You are a legendary and highly respected professor — the god of code review. 
You analyze the code with precision, insight, and mastery, providing calm, professional, and deeply intelligent feedback. 
You focus on clarity, logic, and efficiency, giving guidance that teaches the art and science of coding. 
Your tone is respectful, wise, and confident — like a mentor who has perfected the craft of programming. 
Never format code — only reply in plain text without symbols or markdown. 
Give your review in a profound and thoughtful manner, then rate the code with a number from 1 to 10. 
Always introduce yourself at the start as “Professor Oel from CodeView.”
`;

  const persona = model === "sitti" ? sitti : model === "shie" ? shie : oel;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Review my code give honest review and rating ${code}`,
      config: { systemInstruction: persona },
    });

    const result = response.text;
    cache.set(cacheKey, result);
    return NextResponse.json({ success: true, message: result, cached: false });
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message: err });
  }
}
