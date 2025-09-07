import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import FilterBox from "../filterData/FilterData";

const ProductUI = () => {
  const { serviceType, venue } = useParams();
  const location = useLocation(); 
  const { fetchProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    username: "",
    serviceType: serviceType,
    location: "",
    venue: venue || "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      username: params.get("username") || "",
      serviceType: params.get("serviceType") || serviceType,
      location: params.get("location") || "",
      venue: venue || "",
    };
    setFilters(newFilters);

    const loadData = async () => {
      const data = await fetchProducts(newFilters); // fetch with combined filters
      setProducts(data || []);
    };
    loadData();
  }, [location.search, fetchProducts, serviceType, venue]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <FilterBox onSearch={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition"
            >
              {product.images?.[0] ? (
                <img
                  src={`http://localhost:5000/${product.images[0]}`}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4">
                <p className="text-sm text-gray-600">👤 {product.user?.name}</p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="text-sm text-[#94624b] font-semibold">
                  📍 {product.city}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-bold text-green-600">
                    ⭐ {product.ratings || 0} / 5
                  </span>
                  <button className="cursor-pointer bg-[#94624b] text-white px-4 py-1 rounded-md hover:bg-[#7a4e39] transition">
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
