import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onProductClick,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <div
      className="bg-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 flex flex-col h-full"
      onClick={() => onProductClick(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-[3/4] object-cover rounded-t-lg"
      />
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        {/* Product Name */}
        <h3
          className="text-xs sm:text-sm font-medium mb-1 line-clamp-2 text-card-foreground min-h-[2.2rem] sm:min-h-[2.5rem] flex items-center"
          style={{ lineHeight: "1.1rem" }}
        >
          {product.name}
        </h3>

        {/* Price and Offers */}
        <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:items-center sm:gap-2">
          <span className="inline-flex items-center text-[11px] sm:text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full gap-1">
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8" fill="#2ECC71" />
              <text
                x="8"
                y="12"
                textAnchor="middle"
                fontSize="10"
                fill="#fff"
                fontWeight="bold"
              >
                ₹
              </text>
            </svg>
            ₹{(product.price * 39).toLocaleString()}
            <span className="text-green-900 ml-1 whitespace-nowrap">with 1 Special Offers</span>
          </span>
          <span className="inline-flex items-center text-[11px] sm:text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            Free Delivery
          </span>
        </div>

        {/* Rating and Trusted */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="bg-green-600 text-white text-xs sm:text-sm px-2 py-1 rounded flex items-center gap-1 font-bold">
            {product.rating}
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-white" />
          </span>
          <span className="text-xs sm:text-sm text-gray-500 font-bold">
            ({product.reviews})
          </span>
          <span className="inline-flex items-center ml-0 sm:ml-2">
            <svg
              width="22"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                d="M9.901 5.496a2 2 0 0 1 2-2h7.6a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7.6a2 2 0 0 1-2-2v-5Z"
                fill="#FFE7FB"
              ></path>
              <path
                d="M16.5 3.239 9.027.059a.746.746 0 0 0-.585 0L.969 3.24a.782.782 0 0 0-.47.721v6.36c0 5.321 3.139 7.611 7.947 9.622a.746.746 0 0 0 .576 0c4.809-2.01 7.948-4.3 7.948-9.622V3.96c0-.316-.186-.6-.47-.721Z"
                fill="#FFE7FB"
              ></path>
              <path
                d="m15.748 3.894-6.75-2.871a.673.673 0 0 0-.528 0l-6.75 2.87a.706.706 0 0 0-.424.652v5.745c0 4.806 2.835 6.874 7.178 8.69.167.07.353.07.52 0 4.343-1.816 7.178-3.884 7.178-8.69V4.545a.706.706 0 0 0-.424-.651Z"
                fill="#60014A"
              ></path>
              <path
                d="M10.852 6.455c.804.006 1.482.28 2.04.817.565.54.843 1.185.837 1.946l-.023 3.58c-.003.426-.37.77-.824.77-.45-.003-.814-.35-.81-.777l.022-3.58a1.098 1.098 0 0 0-.367-.85 1.216 1.216 0 0 0-.885-.35 1.247 1.247 0 0 0-.921.372c-.23.227-.344.54-.347.856l-.02 3.528c-.003.432-.376.782-.833.78-.458-.004-.828-.357-.824-.79l.022-3.548c.004-.31-.11-.617-.334-.844a1.254 1.254 0 0 0-.918-.378 1.253 1.253 0 0 0-.892.34c-.24.23-.37.513-.37.845l-.022 3.576c-.004.43-.373.777-.827.774-.455-.003-.818-.353-.815-.783l.023-3.564c.003-.66.25-1.308.714-1.799.6-.632 1.34-.948 2.199-.942.82.006 1.521.285 2.082.853.578-.565 1.272-.835 2.093-.832Z"
                fill="#FF9D00"
              ></path>
            </svg>
            <span className="ml-0.5 text-[10px] sm:text-xs font-semibold text-pink-700">Trusted</span>
          </span>
        </div>
        {/* Add to Cart button (optional) */}
        {/* <div className="mt-auto">
          <Button 
            variant="fashion"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            Add to Cart
          </Button>
        </div> */}
      </div>
    </div>
  );
};