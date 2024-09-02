// File: pages/result.tsx
"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Wendy_One } from "next/font/google";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const ResultPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const options = [];
    for (let i = 1; i <= 8; i++) {
      const option = localStorage.getItem(`question${i}`);
      if (option) options.push(option);
    }
    setSelectedOptions(options);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen bg-blue-500 flex items-center justify-center">
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          <div className="relative flex-grow">
         
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 mt-60">
              <div className="text-center text-balck space-y-6 pt-20">
                <h2 className={`text-3xl font-bold ${wendyone.className}`}>
                  Your Selected Options
                </h2>
              </div>
              <div className="text-center text-black space-y-6 mt-20">
                {selectedOptions.length > 0 ? (
                  <ul className="list-disc text-xl">
                    {selectedOptions.map((option, index) => (
                      <li key={index} className={`font-bold ${wendyone.className}`}>
                        Question {index + 1}: {option}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={`text-3xl font-bold ${wendyone.className}`}>
                    No options selected
                  </p>
                )}
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

export default ResultPage;
