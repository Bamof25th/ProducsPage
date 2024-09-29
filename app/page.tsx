"use client";

import { ProductCardComponent } from "@/components/product-card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect, Suspense } from "react";
import {
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectTotalPages,
} from "@/redux/productSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { AppDispatch } from "@/redux/store";

// Remove the unused Product interface

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

function HomeContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(
        fetchProducts({
          page: currentPage,
          category: selectedCategory,
          search: searchTerm,
        })
      );
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, selectedCategory, searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchTerm) params.set("search", searchTerm);
    router.push(`?${params.toString()}`);
  }, [selectedCategory, searchTerm, router]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">
            Discover amazing products
          </h1>

          <div className="mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Category filter */}
            <div className="relative flex-grow">
              <select
                className="w-full p-3 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory || ""}
                onChange={(e) => handleCategoryChange(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Search input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-3 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCardComponent key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

// Limitations:
// 1.App does not use search optimizations like debounce and lazy loading.
// 2.App does not have a product detail page.
// 3.We could have used revalidation to update the data on the client side if we had a real api.
// 4.We could have used 12 products in a single page a s limit to perfect the ui/ux.
// 5.redux is not required for this small app could  have used contextAPI instead.  
