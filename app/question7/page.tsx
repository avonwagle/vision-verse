// File: pages/quiz.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const QuizPage: React.FC = () => {
  const router = useRouter();

  const handleOptionClick = (option: string) => {
     // Store the selected option in localStorage
     let numbersToSave: number[] = [];

     if (option === 'Option 1') {
       // Save numbers 1, 6 for Option 1
       numbersToSave = [1, 6];
     } else if (option === 'Option 2') {
       // Save numbers 2, 4, 9 for Option 2
       numbersToSave = [5,7,8];
     } else if (option === 'Option 3') {
       // Save numbers 2, 4, 9 for Option 3
       numbersToSave = [2,9];
     } else if (option === 'Option 4') {
       // Save numbers 2, 4, 9 for Option 4
       numbersToSave = [4,6];
     }
 
     // Store the selected numbers in localStorage
     localStorage.setItem('question7', JSON.stringify(numbersToSave));
    router.push("/question8"); // Navigate to the next page
  };

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
              src="/images/quiz7.png" // Ensure this image is in your public folder
              alt="Quiz"
              className="w-full h-full object-cover"
            />
            
            {/* Question at the top */}
            <div className="absolute inset-0 flex flex-col justify-start items-center p-6 -mt-3">
              <div className="text-center text-white space-y-6 mt-8">
                <h2 className={`text-3xl font-bold ${wendyone.className}`}>
                Your habit when walking with your dog is?
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
                  Always following the same route
                  </p>
                </div>
                <div
                  onClick={() => handleOptionClick("Option 2")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                  Finding new routes and environments
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center w-full px-6 pt-5">
              <div
                  onClick={() => handleOptionClick("Option 3")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                  Prioritizing places where other dogs can be encountered
                  </p>
                </div>
                <div
                  onClick={() => handleOptionClick("Option 4")}
                  className="cursor-pointer p-4 bg-[#192E2B] border-2 border-yellow-100 rounded-2xl text-white text-center transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E] flex items-center justify-center option-button"
                >
                  <p>
                  Choosing times and places with fewer people
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

