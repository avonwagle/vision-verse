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
    router.push("/quiz"); // Navigates to /start
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
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 space-y-6">
              {/* Main Title */}

              {/* Instruction Text */}
              <p className="text-md text-white text-center px-4 ">
                Discover the beauty within every moment. Our personalized card is a small treasure, uniquely crafted to brighten your day and remind you of the extraordinary in the ordinary.
              </p>
              
              {/* Top SVG Image */}
              <img src="/images/dog.png" alt="Instruction 1" className="w-70 h-80" />
              
              {/* SVG Images with Text */}
              
              <div className="flex justify-between w-full max-w-md mt-20 px-4 mr-5">
                <div className="flex flex-col items-center">
                  <img src="/images/circular_left.png" alt="Left Image" className="w-30 h-30" />
                  <p className="text-center text-sm mt-2 mr-5 text-white">
                    Personality assessments deepen understanding for improved relationships
                  </p>
                </div>
                <div className="flex flex-col items-center ml-5">
                  <img src="/images/circular_right.png" alt="Right Image" className="w-30 h-30" />
                  <p className="text-center text-sm mt-2 text-white">
                    Test results help personal development and enhance communication
                  </p>
                </div>
              </div>
              

              {/* Final SVG Image */}
              <div className="absolute bottom-5 w-full flex justify-center">
                <img src="/svg/onboard2.svg" alt="Instruction 3" className="w-20 h-20 mt-6" />
              </div>
            </div>

            {/* Footer Section */}
          
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
