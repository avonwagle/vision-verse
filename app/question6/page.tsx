"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";

import { useEffect } from "react";
import { usePageTracking } from "../hooks/usePageTracking";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const getUniqueUserId = () => {
  let userId = localStorage.getItem('uniqueUserId');
  return userId;
};
const userId = getUniqueUserId();  // Get or create a unique user ID


const QuizPage: React.FC = () => {
  const router = useRouter();
  usePageTracking('/question6');  // This tracks the question 6 page
  const handleOptionClick = (option: string) => {
    let numbersToSave: number[] = [];
    let answer='';

    if (option === "Option 1") {
      numbersToSave = [1, 5];
      answer='Strong functionality, intellectual development';
    } else if (option === "Option 2") {
      numbersToSave = [2, 9];
      answer='Promoting interaction and deepening relationships';
    } else if (option === "Option 3") {
      numbersToSave = [3, 6];
      answer='Durable and simple, long-lasting use';
    } else if (option === "Option 4") {
      numbersToSave = [4, 7];
      answer='Innovative and interesting, sparking curiosity';
    }

    localStorage.setItem("question6", JSON.stringify(numbersToSave));

    // Send response to the backend
    fetch('/api/question-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,  // Replace with the actual userId
        questionId: 'When selecting toys for your dog, which type do you prefer?',
        selectedAnswer: answer
      }),
    });
  
    router.push("/question7");
  };
  
  // Page view tracking
  useEffect(() => {
    const userId = getUniqueUserId();  // Get or create a unique user ID
    const deviceType = navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop';
    const channel = document.referrer.includes('google') ? 'organic' : 'direct';
    
    // Measure page load response time
    const startTime = performance.now();

    const sendPageView = () => {
      const responseTime = performance.now() - startTime; // Calculate response time
      fetch('/api/page-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          page: 'Question 6 Page',
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
          page: 'Question 6 Page',
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

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen bg-green-500 flex items-center justify-center">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
            <img
              src="/images/quiz6.png" // Ensure this image is in your public folder
              alt="Quiz"
              className="w-full h-full object-cover"
            />
            
            {/* Question at the top */}
            <div className="absolute inset-0 flex flex-col justify-start items-center p-6">
              <div className="text-center text-white space-y-6 mt-8">
                <h2 className={`text-3xl font-bold ${wendyone.className}`}>
                When selecting toys for your dog, which type do you prefer?
                </h2>
              </div>
            </div>

            {/* Options: Adjusted to the left and right sides */}
            <div className="absolute inset-x-0 bottom-20 flex flex-col justify-end items-center space-y-6 mb-6">
              <div className="flex justify-between items-center w-full px-6">
            
                <div
                  onClick={() => handleOptionClick("Option 1")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                    Strong functionality, intellectual development
                  </p>
                </div>
                <div
                  onClick={() => handleOptionClick("Option 2")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                    Promoting interaction and deepening relationships
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center w-full px-6 ">
                <div
                  onClick={() => handleOptionClick("Option 3")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                    Durable and simple, long-lasting use
                  </p>
                </div>
                <div
                  onClick={() => handleOptionClick("Option 4")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                    Innovative and interesting, sparking curiosity
                  </p>
                </div>
              </div>
            </div>

         
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
