// File: pages/start.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import LanguageSelector from "../components/languageselector";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const QuizPage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/question1"); // Navigates to /start
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div onClick={handleClick} className="relative min-h-screen bg-green-500 flex items-center justify-center">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
            <img
              src="/images/quiz.png"
              alt="Start"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10">
              <LanguageSelector />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="text-center text-white space-y-6 pt-20">
                <h1 className={`text-5xl font-bold ${wendyone.className}`}>
                Discover Your  
                  <br />
                  Scent-Based
                  <br />
                  Personality
                </h1>
              </div>
              
              <div className="text-center text-white space-y-6 mt-32 mr-20">
                <h1 className={`text-3xl font-bold ${wendyone.className}`}>
                Qs  
              
                </h1>
              </div>
              <div className="text-center text-white space-y-6 mt-2">
                <h1 className={`text-8xl font-bold ${wendyone.className}`}>
                
                8
                  
                </h1>
              </div>
              <div className="text-center text-white space-y-6 mt-10">
                <h1 className={`text-3xl font-bold ${wendyone.className}`}>
              
                Tap To Start
                </h1>
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
