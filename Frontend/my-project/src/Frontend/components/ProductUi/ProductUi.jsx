import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import FilterBox from "../filterData/FilterData";
import { MdOutlineStar } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const ProductUI = () => {
  const { serviceType, venue } = useParams();
  const location = useLocation();
  const { fetchProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader State
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    username: "",
    serviceType: serviceType || "",
    location: "",
    venue: venue || "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Load shuru hone par true
      const data = await fetchProducts(filters);
      setProducts(data || []);
      setLoading(false); // Data milne ke baad false
    };
    loadData();
  }, [filters, fetchProducts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      username: params.get("username") || "",
      serviceType: params.get("serviceType") || serviceType,
      location: params.get("location") || "",
      ...(venue && { venue }),
    };
    setFilters(newFilters);
  }, [location.search, serviceType, venue]);

  return (
    <div className="min-h-screen bg-[#FDF8FA] pb-20">
      <div className="mx-auto w-[92%] lg:w-[88%] pt-12">
        
        {/* Filter Section */}
        <FilterBox
          onSearch={(newFilters) =>
            setFilters({ ...filters, ...newFilters, serviceType, venue })
          }
        />

        {/* Loader ya Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            {/* Pink Animated Spinner */}
            <div className="relative">
                <div className="w-16 h-16 border-4 border-pink-100 border-t-pink-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-pink-400 rounded-full animate-pulse opacity-50"></div>
            </div>
            <p className="mt-6 text-pink-600 font-black uppercase tracking-[0.2em] text-xs animate-bounce">
                Finding Vendors...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-pink-50 shadow-sm hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500 flex flex-col"
                >
                  {/* Image Section */}
                  <div className="relative h-72 overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={`http://localhost:5000/${product.images[0]}`}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                        No Image Available
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm border border-white">
                      <IoLocationSharp className="text-pink-600" size={12} />
                      <span className="text-[10px] font-black uppercase tracking-tighter text-slate-800">{product.city}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <MdOutlineStar className="text-yellow-400" size={16} />
                      <span className="font-bold text-white text-xs">{product.ratings || "4.8"}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-3">
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-pink-600 transition-colors truncate">
                        {product.title}
                      </h3>
                      <p className="text-pink-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                        {product.serviceType} Specialist
                      </p>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium italic opacity-80">
                      "{product.description || "Transforming your special day into a dream celebration with our premium services."}"
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-pink-50">
                      <Link
                        to={product.venue ? `/${product.serviceType}/${product.venue}/${product._id}` : `/${product.serviceType}/product/${product._id}`}
                        className="relative text-xs font-black uppercase tracking-widest text-slate-400 hover:text-pink-600 transition-colors group/link"
                      >
                        View Details
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover/link:w-full"></span>
                      </Link>

                      <button
                        onClick={() => navigate("/bookevent", { state: { product } })}
                        className="flex items-center gap-2 bg-pink-600 hover:bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-lg shadow-pink-100 transition-all duration-300 active:scale-95 group/btn"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">Book Now</span>
                        <FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-pink-100">
                <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-200">
                  <FiSearch size={48} />
                </div>
                <h3 className="text-2xl font-black text-slate-800">No Match Found</h3>
                <p className="text-slate-400 font-medium">Try adjusting your filters to find more vendors.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductUI;