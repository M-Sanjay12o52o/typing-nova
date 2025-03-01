"use client";

import { Input } from "./ui/input";
import React, { useEffect, useRef, useState } from "react";
import { sampleText } from "@/lib/utils";

interface TypingTestProps {
  onTestComplete: (wpm: number) => void;
}

export default function TypingTest({ onTestComplete }: TypingTestProps) {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [selectedTime, setSelectedTime] = useState<number>(60);
  const [started, setStarted] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [textSize, setTextSize] = useState<string>("base");
  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const finishTest = () => {
    setIsFinished(true);
    const wordsPerMinute = calculateWPM();
    setWpm(wordsPerMinute);
    onTestComplete(wordsPerMinute);
  };

  const calculateWPM = () => {
    const words = input.trim().split(/\s+/).length;
    const minutes = (selectedTime - timeLeft) / 60;
    return Math.round(words / Math.max(minutes, 0.01));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);
    setInput(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).length);
    setTimeout(scrollToCurrentPosition, 10);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setSelectedTime(newTime);
    setTimeLeft(newTime);
    if (started || isFinished) resetTest();
  };

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextSize(e.target.value);
  };

  const resetTest = () => {
    setInput("");
    setStarted(false);
    setIsFinished(false);
    setWordCount(0);
    setWpm(0);
    setTimeLeft(selectedTime);
    if (inputRef.current) inputRef.current.focus();
  };

  const renderHighlightedText = () => {
    return sampleText.split('').map((char, index) => {
      let className = "transition-colors duration-150";
      if (index < input.length) {
        className += input[index] === char
          ? " text-green-600 font-medium"
          : " text-red-600 bg-red-50";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const scrollToCurrentPosition = () => {
    if (!textContainerRef.current) return;

    const currentIndex = input.length;
    const currentCharElement = textContainerRef.current.querySelector(
      `span:nth-child(${currentIndex + 1})`
    );

    if (currentCharElement) {
      const containerRect = textContainerRef.current.getBoundingClientRect();
      const charRect = currentCharElement.getBoundingClientRect();

      const distanceFromBottom = containerRect.bottom - charRect.bottom;
      if (distanceFromBottom < 100) {
        textContainerRef.current.scrollTop += 30;
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <span
            className={`text-2xl font-semibold ${
              timeLeft <= 10 ? "text-red-600" : "text-gray-900"
            }`}
          >
            {timeLeft}s
          </span>
          <span className="text-gray-600">remaining</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Timer:</label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              disabled={started && !isFinished}
              className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm hover:bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>1m</option>
              <option value={120}>2m</option>
              <option value={300}>5m</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Text Size:</label>
            <select
              value={textSize}
              onChange={handleTextSizeChange}
              className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm hover:bg-gray-50"
            >
              <option value="base">Small</option>
              <option value="lg">Medium</option>
              <option value="xl">Large</option>
              <option value="2xl">Extra Large</option>
            </select>
          </div>
          <button
            onClick={resetTest}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Stats Display */}
      <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-3 text-gray-700">
          <span>Words:</span>
          <span className="font-semibold text-gray-900">{wordCount}</span>
        </div>
        {started && !isFinished && (
          <div className="flex items-center gap-3 text-gray-700">
            <span>Current WPM:</span>
            <span className="font-semibold text-gray-900">{calculateWPM()}</span>
          </div>
        )}
        {isFinished && (
          <div className="flex items-center gap-3 text-gray-700">
            <span>Final WPM:</span>
            <span className="font-semibold text-blue-600 text-lg">{wpm}</span>
          </div>
        )}
      </div>

      {/* Text Display */}
      <div
        ref={textContainerRef}
        className={`flex-1 overflow-y-auto px-6 py-4 bg-white text-${textSize} text-gray-800 leading-relaxed tracking-wide shadow-inner border-b border-gray-200`}
      >
        {renderHighlightedText()}
      </div>

      {/* Results Display (when finished) */}
      {isFinished && (
        <div className="px-6 py-4 bg-blue-50 border-t border-blue-200 text-center">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Test Completed!</h2>
          <p className="text-lg text-gray-700">
            Your typing speed: <span className="font-semibold text-blue-600">{wpm} WPM</span>
          </p>
          <button
            onClick={resetTest}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Input - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white border-t border-gray-200 shadow-lg z-20 max-w-4xl mx-auto w-full">
        <Input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder={isFinished ? "Test completed" : "Start typing here..."}
          className={`w-full p-3 text-lg text-gray-800 border ${
            isFinished ? "bg-gray-100 border-gray-300" : "border-gray-300 focus:border-blue-500"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          autoFocus
        />
      </div>
    </div>
  );
}