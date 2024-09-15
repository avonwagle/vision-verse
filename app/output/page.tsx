// File: pages/start.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const OutputPage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/result"); // Navigates to /start
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
              src="/output/output.png"
              alt="Start"
              className="w-full h-full object-cover"
            />
         
         
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

export default OutputPage;
