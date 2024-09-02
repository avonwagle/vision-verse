// File: pages/start.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const StartPage: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
      router.push("/onboardingnext"); // Navigates to /start
    };
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div  onClick={handleClick} className="relative min-h-screen bg-green-500 flex items-center justify-center">
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
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 space-y-2">
              {/* Main Title */}
              <h1 className={`text-3xl font-bold text-white ${wendyone.className}`}>
                How to play
              </h1>
              {/* Instruction Text */}
              <p className="text-md text-white text-center px-2">
                According to your preference, choose the corresponding option. (Hint: The more intuitive, the better.)
              </p>
              {/* SVG Image */}
              <img src="/images/top_onboard.png" alt="Instruction 1" className="w-50 h-56" />
              {/* Single Choice Question Text */}
              <p className="text-sm text-white">Single Choice Question</p>
              {/* Another SVG Image */}
              <img src="/images/bottom_onboard.png" alt="Instruction 2" className="w-50 h-56" />
              {/* Repeated Text */}
              <p className="text-sm text-white">Multiple Choice Question</p>

 {/* Final SVG Image */}
 <div className="absolute bottom-5 w-full flex justify-center">
                <img src="/svg/onboarding.svg" alt="Instruction 3" className="w-20 h-20 mt-6" />
              </div>
            
            </div>
            {/* Footer Section */}
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

export default StartPage;
