import React from "react";
import HeroSection from "../components/banner/Banner";
import CateringSlider from "../components/HeroSection/HeroSection1";
import HeroSection2 from "../components/HeroSection/HeroSection2";
import HeroSection3 from "../components/HeroSection/HeroSection3";
import HeroSection4 from "../components/HeroSection/HeroSection4";
import HeroSection5 from "../components/HeroSection/HeroSection5";
import HeroSection6 from "../components/HeroSection/HeroSection6";
import HeroSection7 from "../components/HeroSection/HeroSection7";
import HeroBanner from "../components/HeroSection/HeroBanner";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CateringSlider />
      <HeroSection2 />
      <HeroSection3 />

      <HeroSection4 />
      <HeroBanner />
      <HeroSection5 />
      <HeroSection6 />
      <HeroSection7 />
    </>
  );
};

export default Home;
