import Image from 'next/image';
import { FiStar } from 'react-icons/fi'; // Make sure to install react-icons

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number; // Add this if it's available in your API response
}

export function ProductCardComponent({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image
          src={product.thumbnail}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {product.category}
        </div>
        <h3 className="mt-1 text-lg font-medium text-gray-900 truncate">{product.title}</h3>
        <p className="mt-2 text-gray-500 truncate">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <FiStar className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="text-gray-600">{product.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}