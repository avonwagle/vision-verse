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
    localStorage.setItem('question4', option);
    router.push("/question5"); // Navigate to the next page
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
              src="/images/quiz4.png" // Make sure this image exists in your public folder
              alt="Quiz"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 mt-60">
              <div className="text-center text-white space-y-6 pt-20">
                {/* You can add any additional content here */}
              </div>
              
              <div className="text-center text-white space-y-6 mt-20">
                <h2 className={`text-2xl font-bold ${wendyone.className}`}>
                If the dog gradually becomes independent and no longer hides behind you when scared, how do you feel?                </h2>
              </div>
              
              <div className="flex justify-around space-x-4 mt-16 mb-10">
                <div
                  onClick={() => handleOptionClick('Option 1')}
                  className="cursor-pointer p-4 bg-[#062106] border-2 border-yellow-100 rounded-lg text-white text-center flex-1 px-3 mx-3 transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E]"
                >
                  <p className="text-sm">The emotional expression of the poetry</p>
                </div>
                <div
                  onClick={() => handleOptionClick('Option 2')}
                  className="cursor-pointer p-4 bg-[#062106] border-2 border-yellow-100 rounded-lg text-white text-center flex-1 px-3 mx-3 transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#21322E]"
                >
                  <p className="text-sm">The emotional expression of the poetry</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full">
              <footer className="bg-[#21322E] text-white py-2 text-center w-full">
                <p className="text-sm">© 2024 Visionverse. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
