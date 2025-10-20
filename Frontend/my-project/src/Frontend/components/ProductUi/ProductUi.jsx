import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import FilterBox from "../filterData/FilterData";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineStar } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const ProductUI = () => {
  const { serviceType, venue } = useParams();
  const location = useLocation();
  const { fetchProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handlenavigate = (product) => {
    navigate("/bookevent", { state: { product } });
  };
  const [filters, setFilters] = useState({
    username: "",
    serviceType: serviceType || "",
    location: "",
    venue: venue || "",
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts(filters);
      setProducts(data || []);
    };
    loadData();
  }, [filters, fetchProducts]);

  // Initial load from query params (agar URL se aaye)
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
    <div className="mx-auto w-[88%] px-6 py-8">
      <div className="">
        <FilterBox
          onSearch={(newFilters) =>
            setFilters({ ...filters, ...newFilters, serviceType, venue })
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="rounded-lg  shadow-md outline-none overflow-hidden bg-white hover:shadow-lg transition"
            >
              {product.images?.[0] ? (
                <Link
                  to={
                    product.venue
                      ? `/${product.serviceType}/${product.venue}/${product._id}`
                      : `/${product.serviceType}/${product._id}`
                  }
                >
                  <div className="img w-full ">
                    <img
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt={product.title}
                      className="w-full h-100  object-cover"
                    />
                  </div>
                </Link>
              ) : (
                <div className="w-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4 flex  flex-col gap-1.5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="text-[17px]  flex items-center gap-2 capitalize  font-semibold">
                  <IoLocationSharp className="text-red-500" />

                  {product.city}
                </p>

                <div className="flex justify-between items-center ">
                  <p className="text-[#777] flex items-center  gap-0.5">
                    <MdOutlineStar className="text-red-500" />
                    {product.ratings} (100)
                  </p>

                  <button
                    onClick={() => handlenavigate(product)}
                    className="cursor-pointer bg-[#94624b] text-white px-4 py-1 rounded-md hover:bg-[#7a4e39] transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductUI;
