"use client";

import TypingTest from "@/components/TypingTest";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TypingTestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [result, setResult] = useState<number | null>(null);

  const handleTestComplete = async (wpm: number) => {
    setResult(wpm);

    if (session) {
      try {
        const response = await fetch('/api/typing-test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wpm,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save typing test result');
        }

        router.refresh();
      } catch (error) {
        console.error('Error saving test result: ', error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Typing Speed Test
        </h1>

        {result !== null ? (
          <div className="text-center mb-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Result: {result} WPM
            </h2>
            <button
              onClick={() => setResult(null)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <TypingTest onTestComplete={handleTestComplete} />
        )}
      </div>
    </div>
  );
}