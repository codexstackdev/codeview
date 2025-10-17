"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import kenshie from "./images/kenshie.png";

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100 p-8 text-gray-700 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left max-w-xl z-10"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
          👋 Welcome to CodeView
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Where your code gets reviewed, roasted, and refined — all powered by
          AI. Expect a mix of{" "}
          <span className="font-semibold">honest feedback</span>,{" "}
          <span className="font-semibold">gentle sarcasm</span>, and a sprinkle
          of kindness.
        </p>

        <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-md mb-8">
          <p className="text-sm text-gray-500 italic">
            ⚙️ Note: Reviews are AI-generated, so results may vary between
            “constructive insight” and “playful roast.” Either way, your code
            will come out better (and braver).
          </p>
        </div>

        <motion.button
          onClick={() => router.push("/review")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-pink-300/50 transition-all duration-200"
        >
          🚀 Get Reviewed Now
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mt-10 md:mt-0 md:ml-12 w-[300px] h-[400px] flex-shrink-0"
      >
        <Image
          src={kenshie}
          alt="Kenshie"
          fill
          priority
          className="object-contain drop-shadow-2xl pointer-events-none"
        />
      </motion.div>

      <footer className="absolute bottom-5 text-sm text-gray-400 text-center w-full">
        © {new Date().getFullYear()} CodeView — where AI learns your coding
        habits.
      </footer>
    </div>
  );
}
