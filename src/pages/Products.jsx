import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { BaseURL } from "../utils/BaseURL";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BaseURL}allproduct`)
      .then((res) => {
        const formattedProducts = res.data.map((product) => {
          let imageUrl = "";

          if (product.image && product.image.data) {
            const base64String = btoa(
              new Uint8Array(product.image.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            imageUrl = `data:image/jpeg;base64,${base64String}`;
          }

          return { ...product, imageUrl };
        });

        setProducts(formattedProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
    useEffect(() => {
    axios
      .get(`${BaseURL}test`)
      .then((res) => {
        console.log("Backend Test Response:", res.data);
      })
      .catch((err) => {
        console.error("Error testing backend connection:", err);
      });
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Products</h2>
          <Link
            to={"/addproduct"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center">
                  <div className="flex flex-col items-center">
                    <Spinner />
                    <p className="mt-2 text-gray-500 text-sm">
                      Loading products...
                    </p>
                  </div>
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.product_name}
                        className="w-12 h-12 rounded-md object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/viewproduct/${product.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
