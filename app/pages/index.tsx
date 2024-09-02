// pages/index.tsx
"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import LanguageSelector from "../components/languageselector";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const MainPage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/onboarding"); // Navigates to /onboard1
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
              src="/images/image1.png"
              alt="Start"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10">
              <LanguageSelector />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 top-56">
              <div className="text-center text-white space-y-6">
                <h1 className={`text-4xl font-bold ${wendyone.className}`}>
                  If I entered a dog
                  <br />
                  beauty pageant, I
                  <br />
                  would be...
                </h1>
                <p className="text-md">
                  Discover the Breed that Speaks to Your Soul
                </p>
                <div className="relative flex justify-center items-center top-20">
                  <img
                    src="/images/ellipse1.svg"
                    alt="Ellipse Background"
                    className="w-48 h-auto transform absolute"
                  />
                  <img
                    src="/images/ellipse2.svg"
                    alt="Ellipse Background"
                    className="w-48 h-auto transform absolute opacity-80"
                  />
                  {/* Let's Start Button */}
                  <p
                    onClick={handleClick}
                    className={`relative text-2xl text-black px-6 py-2 font-bold h-12 ${wendyone.className} hover:text-white hover:scale-110 transition-transform duration-200 cursor-pointer`}
                  >
                    Let's Start
                  </p>
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

export default MainPage;
