import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { useProduct } from "../../context/ProductContext";

const HeroSection6 = () => {
  const { fetchProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const [city, setCity] = useState("Lahore"); // ✅ default Lahore

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts("decorators", city);
   console.log(data, "dataphoto");
      setProducts(data);
    };
    loadData();
  }, [city, fetchProducts]);

  return (
    <div className="w-[95%] mx-auto my-10">
      {/* Heading & City Filter */}
      <div className="wra flex flex-col gap-4 sm:flex-row items-center justify-between">
        <div className="heaing">
          <h2 className="text-2xl font-bold">Decorators Services</h2>
        </div>
        <div className="cities flex gap-1.5 my-4">
          {["Lahore", "Karachi", "Islamabad"].map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-4 py-2 rounded cursor-pointer outline-none ${
                city === c ? "bg-[#8B6655] text-white" : "bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        breakpoints={{
          300: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className=""
      >
        {products && products.length > 0 ? (
          products.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white my-2.5 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={`http://localhost:5000/${item.images[0]}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-xl text-[#777]">Product Not Found</p>
        )}
      </Swiper>
    </div>
  );
};

export default HeroSection6;
