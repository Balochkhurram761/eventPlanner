import { Link } from "react-router-dom";
import React from "react";

const HeroSection8 = () => {
  return (
    <div className="bg-[rgb(215,56,94)] py-12">
      <div className=" w-[97%] mx-auto flex flex-col  md:flex-row items-center justify-between px-6 text-white">
        {/* LEFT TEXT */}
        <div className="md:w-1/2 flex  flex-col gap-2.5 space-y-6">
          <h1 className="text-3xl md:text-5xl  leading-tight">
            Find the Talent needed to <br />
            <span className="font-bold">Arrange Your Wedding</span>
          </h1>

          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="border-white border-[1px] rounded-2xl w-40 text-center py-2 "
          >
            Get Started
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="../src/assets/herosection/10007.webp"
            alt="Wedding Talent"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection8;
