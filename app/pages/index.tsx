"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Wendy_One } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import LanguageSelector from "../components/languageselector";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

// Utility to get or generate a unique user ID
function getUniqueUserId() {
  let userId = localStorage.getItem('uniqueUserId');
  
  if (!userId) {
    userId = crypto.randomUUID();  // Generate a new UUID if it doesn't exist
    localStorage.setItem('uniqueUserId', userId);
  }
  
  return userId;
}

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    const userId = getUniqueUserId(); // Get or create a unique user ID
    
    // Track game start
    const startTime = new Date().toISOString();
    localStorage.setItem('gameStartTime', startTime);  // Save the game start time in localStorage

    // Log game start
    fetch('/api/game-start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        startTime,
        deviceType: navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop',
        channel: document.referrer.includes('google') ? 'organic' : 'direct',
      }),
    });

    // Navigate to game onboarding
    router.push("/onboarding");
  };

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
          page: 'Home Page',
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
          page: 'Home Page',
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

  const handleMuteClick = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
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
                  If I Entered A Dog
                  <br />
                  Beauty Pageant, I
                  <br />
                  Would Be...
                </h1>
                <p className="text-md">
                  Discover The Breed That Speaks To Your Soul
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
