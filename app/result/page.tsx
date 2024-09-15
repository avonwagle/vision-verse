// File: pages/result.tsx
"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Wendy_One } from "next/font/google";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

// Priority order for resolving ties in occurrences
const priorityOrder = [9, 6, 4, 7, 3, 1, 2, 8, 5];

// Map numbers to image paths
const imageMap: Record<number, string> = {
  1: "/output/option1.png",
  2: "/output/option2.png",
  3: "/output/option3.png",
  4: "/output/option4.png",
  5: "/output/option5.png",
  6: "/output/option6.png",
  7: "/output/option7.png",
  8: "/output/option8.png",
  9: "/output/option9.png",
};

// Example questions
const questions = [
  "Question 1 text goes here",
  "Question 2 text goes here",
  "Question 3 text goes here",
  "Question 4 text goes here",
  "Question 5 text goes here",
  "Question 6 text goes here",
  "Question 7 text goes here",
  "Question 8 text goes here",
];

const ResultPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[][]>([]);
  const [occurrences, setOccurrences] = useState<Record<number, number>>({});
  const [highestOccurrenceNumber, setHighestOccurrenceNumber] = useState<number | null>(null);
  const [showMoreResults, setShowMoreResults] = useState<boolean>(false); // Control visibility of more results

  useEffect(() => {
    const options: number[][] = [];
    let numberCount: Record<number, number> = {};

    for (let i = 1; i <= 8; i++) {
      const option = localStorage.getItem(`question${i}`);
      if (option) {
        const parsedOption = JSON.parse(option); // Assuming options are stored as arrays of numbers
        options.push(parsedOption);

        // Count occurrences of each number
        parsedOption.forEach((num: number) => {
          if (numberCount[num]) {
            numberCount[num]++;
          } else {
            numberCount[num] = 1;
          }
        });
      }
    }

    setSelectedOptions(options);
    setOccurrences(numberCount);

    // Find the highest occurrence count
    const maxCount = Math.max(...Object.values(numberCount));

    // Get the numbers that have the highest occurrence
    const highestNumbers = Object.keys(numberCount)
      .filter((num) => numberCount[Number(num)] === maxCount)
      .map(Number);

    // Find the highest-priority number from the tie-breaking order
    const highestPriorityNumber = priorityOrder.find((num) => highestNumbers.includes(num)) ?? null;

    setHighestOccurrenceNumber(highestPriorityNumber);
  }, []);

  // Determine the image source based on the highest occurrence number
  const imageSrc = highestOccurrenceNumber ? imageMap[highestOccurrenceNumber] : "/images/quiz8.png";

  // Share functionality (for simplicity, using navigator.share API)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Quiz Result",
        text: "Check out my quiz result!",
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    localStorage.clear(); // Clear localStorage to reset quiz
    window.location.href = "/quiz"; // Redirect to quiz page (change this path as needed)
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen flex items-center bg-green-500 justify-center overflow-hidden">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
            <img
              src={imageSrc} // Dynamically set image source
              alt="Quiz"
              className="absolute inset-0 w-full h-full"
            />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 mt-60">
              <div className="text-center text-white space-y-6 pt-20">
                {/* Additional content */}
              </div>
            </div>
          </div>

          {/* Buttons positioned at the bottom, overlapping the background image */}
          <div className="absolute bottom-0 w-full flex justify-around items-center p-4 mb-3">
          <button
              onClick={handleShare}
              className="border border-white text-white px-7 py-2 rounded-full bg-transparent hover:bg-white hover:text-green-500 transition-colors ml-4"
            >
              Share
            </button>
            
            <button
              onClick={() => setShowMoreResults(!showMoreResults)} // Toggle more results
              className="border border-white text-white px-4 py-2 rounded-full bg-transparent hover:bg-white hover:text-green-500 transition-colors ml-3 mr-3"
            >
              More Results
            </button>
          
            <button
              onClick={handleRestart}
              className="border border-white text-white px-4 py-2 rounded-full bg-transparent hover:bg-white hover:text-green-500 transition-colors "
            >
              Play Again
            </button>
          </div>

          {/* Show selected options with questions when 'More Results' is clicked */}
          {showMoreResults && (
            <div className="p-4 bg-white absolute bottom-0 w-full max-h-60 overflow-y-auto">
              {selectedOptions.map((options, index) => (
                <div key={index} className="my-4 p-2 border-b">
                  <h3 className="font-bold text-green-700 mb-2">{questions[index]}</h3>
                  <ul className="list-disc list-inside">
                    {options.map((option, i) => (
                      <li key={i} className="text-gray-700">
                        Option {option} selected
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
