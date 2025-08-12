import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
  const [cart, setCart] = useCart();
  const [values] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Search Results</h1>
          <h6 className="text-gray-600 mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h6>
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {values?.results.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h5>
                  <h5 className="text-blue-600 font-bold">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  Elevate your lifestyle with our premium product, blending
                  innovation and elegance seamlessly. From its sleek design to
                  its exceptional performance, it's the perfect choice for those
                  who demand the best.
                </p>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                    More Details
                  </button>
                  <button
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
