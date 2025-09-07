import React from "react";

const products = [
  {
    link: "/venue",
    image: "../src/assets/herosection/weddingvenue.jpg",
    title: "Venue",
  },
  {
    link: "/dj",
    image: "../src/assets/herosection/dj.jpg",
    title: "DJ Services",
  },
  {
    link: "/Photographers ",
    image: "../src/assets/herosection/camera.jpg",
    title: "Photographers ",
  },
  {
    link: "/catering",
    image: "../src/assets/herosection/catering.jpg",
    title: "Catering",
  },
  {
    link: "/rentalcar",
    image: "../src/assets/herosection/rentalcar.jpg",
    title: "Car Rental",
  },
  {
    link: "/theme",
    image: "../src/assets/herosection/theme.jpg",
    title: "Decorators",
  },
];

const HeroSection2 = () => {
  return (
    <div className="herosection grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-[95%] my-2 mx-auto gap-4">
      {products.map((product, index) => (
        <a
          key={index}
          href={product.link}
          className="relative group overflow-hidden rounded-lg"
        >
          {/* Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full  object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {product.title}
            </h1>
          </div>
        </a>
      ))}
    </div>
  );
};

export default HeroSection2;
