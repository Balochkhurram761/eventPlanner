import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineStar, MdLocationOn } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { useProduct } from "../../context/ProductContext";
import { Link } from "react-router-dom";

const HeroSection1 = () => {
  const { fetchProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const [city, setCity] = useState("Lahore");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts({
        serviceType: "hall",
        location: city,
      });
      setProducts(data);
    };
    loadData();
  }, [city, fetchProducts]);

  return (
    <div className="w-[95%] mx-auto my-16 font-sans">
      <div className="flex flex-col gap-6 md:flex-row items-center justify-between mb-10">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <HiOutlineHomeModern size={14} /> Majestic Venues
          </div>

          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Premium <span className="text-pink-600">Event Halls</span>
          </h2>

          <p className="text-slate-500 font-medium">
            Luxurious spaces designed for your grand celebrations
          </p>
        </div>
        <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
          {["Lahore", "Karachi", "Islamabad"].map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-6 py-2.5 rounded-xl cursor-pointer outline-none font-bold text-sm transition-all duration-300 ${
                city === c
                  ? "bg-white text-pink-600 shadow-md transform scale-105"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Section */}
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        spaceBetween={25}
        slidesPerView={5}
        breakpoints={{
          300: { slidesPerView: 1.2, centeredSlides: true },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-16"
      >
        {products && products.length > 0 ? (
          products.map((item) => (
            <SwiperSlide key={item._id} className="py-4">
              <Link to={`${item.serviceType}/product/${item._id}`}>
                <div className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-pink-200 transition-all duration-500 overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={`http://localhost:5000/${item.images[0]}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Floating Price/Tag Overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg">
                      <p className="text-pink-600 font-black text-xs">
                        Featured
                      </p>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-slate-800 truncate leading-tight group-hover:text-pink-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1 bg-pink-50 px-2 py-1 rounded-lg">
                        <MdOutlineStar className="text-pink-500" />
                        <span className="text-pink-700 font-bold text-xs">
                          {item.ratings || "4.8"}
                        </span>
                        <span className="text-pink-300 text-[10px] font-medium">
                          (100+)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px] font-semibold">
                        <MdLocationOn className="text-slate-300" />
                        {city}
                      </div>
                    </div>

                    <button className="w-full cursor-pointer mt-2 py-3 bg-slate-900 text-white group-hover:bg-pink-600 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-lg group-hover:shadow-pink-200">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="w-full py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
            <FaCarSide size={50} className="text-slate-200 mb-4" />
            <p className="text-xl font-bold text-slate-400">
              No cars available in {city}
            </p>
          </div>
        )}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet-active {
          background: #db2777 !important;
          width: 24px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSection1;
