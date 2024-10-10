"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useRouter } from "next/navigation";
import { usePageTracking } from "../hooks/usePageTracking";

// Font initialization
const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

// Helper function to get user ID from localStorage
const getUniqueUserId = () => {
  return localStorage.getItem('uniqueUserId');
};

// Priority order for resolving ties in occurrences
const priorityOrder = [9, 6, 4, 7, 3, 1, 2, 8, 5];

// Map numbers to image paths for displaying result images
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

// Map numbers to output names
const outputNameMap: Record<number, string> = {
  1: "Border Collie - Perfectionist",
  2: "Golden Retriever - Helper",
  3: "Poolde - Achiever",
  4: "Samoyed - Individualist",
  5: "Alaskan Malamute - Investigator",
  6: "Shiba Inu - Loyalist",
  7: "Cavoodle - Enthusiast",
  8: "Doberman - Leader",
  9: "French Bulldog - PeaceMaker",
};

const ResultPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[][]>([]);
  const [occurrences, setOccurrences] = useState<Record<number, number>>({});
  const [highestOccurrenceNumber, setHighestOccurrenceNumber] = useState<number | null>(null);
  const [showMoreResults, setShowMoreResults] = useState<boolean>(false); // Toggle visibility for "more results"
  const [showModal, setShowModal] = useState<boolean>(false); // Toggle modal visibility for share options

  const router = useRouter();
  usePageTracking('/more-results');  // Track page view

  useEffect(() => {
    const userId = getUniqueUserId();  // Get user ID
    const gameStartTime = localStorage.getItem('gameStartTime');  // Retrieve start time
    const endTime = new Date().toISOString();  // Get current time for game completion
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    const startTime = performance.now();

    // Send game completion data to the server if gameStartTime exists
    if (gameStartTime && userId) {
      const timeSpent = (new Date(endTime).getTime() - new Date(gameStartTime).getTime()) / 1000; // Calculate time spent in seconds

      // Send game completion metrics
      fetch('/api/game-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          startTime: gameStartTime,
          endTime,
          timeSpent,
          deviceType,
          channel,
        }),
      });

      // Clear the game start time after completion
      localStorage.removeItem('gameStartTime');
    }

    // Collect user answers for questions
    const options: number[][] = [];
    let numberCount: Record<number, number> = {};

    for (let i = 1; i <= 8; i++) {
      const option = localStorage.getItem(`question${i}`);
      if (option) {
        const parsedOption = JSON.parse(option);
        options.push(parsedOption);

        // Count occurrences of each answer
        parsedOption.forEach((num: number) => {
          numberCount[num] = (numberCount[num] || 0) + 1;
        });
      }
    }

    setSelectedOptions(options);
    setOccurrences(numberCount);

    // Find the number with the highest occurrence
    const maxCount = Math.max(...Object.values(numberCount));
    const highestNumbers = Object.keys(numberCount)
      .filter((num) => numberCount[Number(num)] === maxCount)
      .map(Number);

    // Find the highest priority number from the tie-breaking order
    const highestPriorityNumber = priorityOrder.find((num) => highestNumbers.includes(num)) ?? null;
    setHighestOccurrenceNumber(highestPriorityNumber);

    const sendPageView = () => {
      const responseTime = performance.now() - startTime; // Calculate response time
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Result Page',
          deviceType,
          channel,
          responseTime, // Include the response time
        }),
      });

      fetch('/api/page-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Result Page',
          deviceType,
          channel,
          responseTime, // Include the response time
        }),
      });
    };

    // Debounce the call to avoid multiple requests
    const timeoutId = setTimeout(sendPageView, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Determine the result image based on the highest occurrence number
  const imageSrc = highestOccurrenceNumber ? imageMap[highestOccurrenceNumber] : "/images/quiz8.png";

  // Function to download the image (for Instagram sharing)
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "quiz-result.png";
    link.click();
  };

  // Share based on selected platform
  const handleShare = (platform: string) => {
    const pageUrl = window.location.href;
    const message = `I played the Doggy Quiz game and got this result! Check yours: ${pageUrl}`;

    if (platform === "facebook") {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
      window.open(facebookUrl, "_blank");
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      window.open(twitterUrl, "_blank");
    } else if (platform === "instagram") {
      handleDownload(); // Download the image for Instagram
    }
    setShowModal(false); // Close the modal after sharing
  };

  // Restart the quiz and clear localStorage
  const handleRestart = () => {
    localStorage.clear();
    router.push("/");  // Navigate to the quiz page
  };

  useEffect(() => {
    if (highestOccurrenceNumber) {
      // Send the outputId and outputName to the API to update the count and name
      fetch('/api/output-repetition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outputId: highestOccurrenceNumber,
          outputName: outputNameMap[highestOccurrenceNumber],
        }),
      })
        .then(response => response.json())
        .then(data => console.log('Output repetition updated:', data))
        .catch(error => console.error('Error updating output repetition:', error));
    }
  }, [highestOccurrenceNumber]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen items-center flex flex-col bg-green-500 justify-between overflow-hidden">
        {/* Top Section: Content and Buttons */}
        <div className="relative flex-grow w-full max-w-md bg-white shadow-md flex flex-col">
          <div className="relative flex-grow">
            <img
              src={imageSrc} // Set the result image dynamically
              alt="Quiz"
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 mt-60">
              <div className="text-center text-white space-y-6 pt-20">
                {/* You can add any additional content here */}
              </div>
            </div>
          </div>

          {/* Buttons at the bottom of the top section */}
          <div className="absolute bottom-0 w-full flex justify-around items-center p-4 -mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="border border-white text-white px-7 py-2 rounded-full bg-transparent hover:bg-white hover:text-green-500 transition-colors"
            >
              Share
            </button>
            <button
              onClick={handleRestart}
              className="border border-white text-white px-4 py-2 rounded-full bg-transparent hover:bg-white hover:text-green-500 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push("/more-results")}  // Navigate to another page
              className="border border-white text-white px-4 py-2 rounded-full bg-transparent hover:bg-white hover:text-green-500 transition-colors"
            >
              {showMoreResults ? "Hide Results" : "More Results"}
            </button>
          </div>
        </div>

        {/* Bottom Section: Image Container with Link */}
        <div className="relative w-full max-w-md shadow-md p-4 bg-[#070A2E]">
          {/* Image container with link */}
          <a
            href="https://your-link-url.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              src="/output/perfume.png"
              alt="Ad"
              className="w-full h-40 object-contain rounded-lg shadow-lg"
            />
          </a>
        </div>

        {/* Modal for selecting the sharing platform */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h3 className="text-xl font-bold mb-4">Share your result</h3>
              <p className="text-gray-700 mb-6">Choose a platform to share your quiz result:</p>
              <button
                onClick={() => handleShare("facebook")}
                className="bg-blue-600 text-white w-full py-2 rounded-full mb-2"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="bg-blue-400 text-white w-full py-2 rounded-full mb-2"
              >
                Share on Twitter
              </button>
              <button
                onClick={() => handleShare("instagram")}
                className="bg-pink-600 text-white w-full py-2 rounded-full"
              >
                Share on Instagram
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full py-2 border border-gray-400 text-gray-700 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultPage;
