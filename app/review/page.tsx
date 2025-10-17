"use client";
import { FormEvent, useState } from "react";
import kenshie from "../images/kenshie.png";

export default function Home() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [model, setModel] = useState<HTMLSelectElement | any>("sitti");
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, model }),
    });
    const data = await res.json();
    if (data.success) {
      setLoading(false);
      setMessage(data.message);
    } else {
      alert(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-5xl">
        <form
          onSubmit={handleFetch}
          className="bg-white shadow-lg border border-gray-200 w-full md:w-[350px] h-[520px] rounded-2xl flex flex-col items-center p-6 transition-transform hover:scale-[1.02] duration-200"
        >
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            💌 Code Reviewer
          </h1>

          <div className="flex flex-col w-full mt-2">
            <label htmlFor="Name" className="text-sm text-gray-500 mb-2">
              Paste your code:
            </label>
            <textarea
              value={code}
              disabled={loading}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300  rounded-lg p-3 text-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300 [&::-webkit-scrollbar]:w-1 
          [&::-webkit-scrollbar-thumb]:bg-gray-300 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 text-black"
              placeholder="Paste your code here..."
            />
          </div>
          <label htmlFor="select" className="text-gray-800 my-2 font-sans">Pick a CodeView Professor</label>
            <select value={model} onChange={(value) => setModel(value.target.value)} className="my-2 border border-gray-500 p-2 rounded-md text-black">
              <option value="sitti">Grumpy sitty</option>
              <option value="shie">Newbie shie</option>
              <option value="oel">Professor oel</option>
              <option value="nirt">Smarty Dirt</option>
              <option value="zyrill">Just Zyrill</option>
            </select>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Reviewing..." : "Review"}
          </button>
        </form>

        <div
          id={message.length === 0 ? "reviewBox" : ""}
          className="bg-white border border-gray-200 shadow-lg w-full md:w-[350px] h-[520px] rounded-2xl p-5 overflow-y-auto text-gray-700 leading-relaxed 
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-thumb]:bg-gray-300 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
        >
          <p className="text-lg font-semibold text-gray-600 mb-3 text-center">
            📝 My Review
          </p>
          <p className="text-sm whitespace-pre-line pointer-events-none">
            {message || "No review yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
