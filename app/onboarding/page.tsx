// File: pages/start.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import "../globals.css";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const StartPage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/onboardingnext"); // Navigates to /onboardingnext
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div onClick={handleClick} className="relative min-h-screen bg-green-500 flex items-center justify-center">
        {/* Mobile frame */}
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          {/* Image Container */}
          <div className="relative flex-grow">
            <img
              src="/images/onboarding.png" // Maintain the same background image for consistency
              alt="Different Start"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 space-y-4">
              {/* Main Title positioned at the top */}
              <div className="absolute top-16">
                <h1 className="text-3xl font-bold text-white poetsen-one-regular">
                  How to play
                </h1>
              </div>

              {/* Instruction Text with gaps between title and text */}
              <div className="mt-20 flex flex-col items-center space-y-6">
                <p className="text-md text-white text-center px-2">
                  According to your preference, choose the corresponding option. (Hint: The more intuitive, the better.)
                </p>

                {/* First SVG Image and text */}
                <img src="/images/top_onboard.png" alt="Instruction 1" className="w-50 h-56" />
                <p className="text-sm text-white -mt-20">Single Choice Question</p>

                {/* Second SVG Image and text */}
                <img src="/images/bottom_onboard.png" alt="Instruction 2" className="w-50 h-56 mt-10" />
                <p className="text-sm text-white mt-2">Multiple Choice Question</p>
              </div>

              {/* Final SVG Image */}
              <div className="absolute bottom-5 w-full flex justify-center">
                <img src="/svg/onboarding.svg" alt="Instruction 3" className="w-20 h-20 mt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
