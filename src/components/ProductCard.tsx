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
      <div className="p-3 flex flex-col flex-1">
        {/* // ...existing code... */}
        <h3
          className="text-sm font-medium mb-1 line-clamp-2 text-card-foreground min-h-[2.5rem] flex items-center"
          style={{ lineHeight: "1.25rem" }}
        >
          {product.name}
        </h3>
        {/* // ...existing code... */}

        {/* // ...existing code... */}
        {/* Price and Offers */}
        <div className="flex flex-col gap-1 mb-2 sm:flex-row sm:items-center sm:gap-2">
          <span className="inline-flex items-center text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full gap-1 sm:text-xs text-[11px]">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
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
            <span className="text-green-900 ml-1">with 1 Special Offers</span>
          </span>
          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full sm:text-xs text-[11px]">
            Free Delivery
          </span>
        </div>
        {/* // ...existing code... */}
        {/* <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full gap-1">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
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
            ₹{(product.price * 39).toLocaleString()}{" "}
            <span className="text-green-900">with 1 Special Offers</span>
          </span>
          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            Free Delivery
          </span>
        </div> */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center font-bold">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
              {product.rating}
              <Star className="w-4 h-4 fill-current text-white" />
            </span>
            <span className="text-sm text-gray-500 ml-2 font-bold">
              ({product.reviews})
            </span>
          </div>
          <span className="text-xs font-medium whitespace-nowrap inline-flex items-center gap-1">
            <svg
              width="55"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.901 5.496a2 2 0 0 1 2-2h41.6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-41.6a2 2 0 0 1-2-2v-9Z"
                fill="#FFE7FB"
              ></path>
              <path
                d="M24.712 6H19.5v1.03h2.052v5.843h1.12V7.03h2.041V6ZM24.698 8.229v4.644h1.06v-2.17c0-1.09.52-1.532 1.228-1.532a.95.95 0 0 1 .353.06V8.198a.85.85 0 0 0-.363-.068c-.55 0-1.031.314-1.267.844h-.02v-.746h-.991ZM32.226 12.873V8.229h-1.07v2.67c0 .697-.481 1.188-1.09 1.188-.56 0-.884-.383-.884-1.1V8.23h-1.06v2.975c0 1.129.628 1.816 1.63 1.816.658 0 1.188-.314 1.443-.766h.05v.619h.981ZM35.25 13.02c1.1 0 1.846-.59 1.846-1.532 0-1.855-2.543-1.03-2.543-2.052 0-.304.236-.55.698-.55.422 0 .765.246.814.59l.992-.207c-.167-.706-.893-1.188-1.836-1.188-1.03 0-1.728.57-1.728 1.434 0 1.856 2.543 1.03 2.543 2.052 0 .393-.265.658-.756.658-.481 0-.874-.255-.992-.668l-.972.197c.226.795.943 1.266 1.934 1.266ZM40.083 12.97c.343 0 .638-.058.795-.136l-.118-.855a.992.992 0 0 1-.471.099c-.501 0-.747-.226-.747-.914V9.132h1.287v-.903h-1.287V6.746l-1.07.206V8.23h-.844v.903h.844v2.21c0 1.207.658 1.629 1.61 1.629ZM45.823 11.744l-.894-.265c-.206.422-.589.657-1.09.657-.746 0-1.256-.53-1.355-1.305h3.525v-.265c-.02-1.6-1.03-2.485-2.297-2.485-1.365 0-2.308 1.07-2.308 2.485 0 1.403.992 2.454 2.425 2.454.933 0 1.61-.442 1.994-1.276ZM43.73 8.906c.6 0 1.12.373 1.169 1.198h-2.406c.118-.766.56-1.198 1.237-1.198ZM46.776 10.556c0 1.463.923 2.464 2.17 2.464.619 0 1.237-.255 1.542-.854h.03v.707h.981V6h-1.07v2.828c-.246-.432-.766-.747-1.463-.747-1.247 0-2.19.992-2.19 2.475Zm1.07 0c0-.874.501-1.542 1.316-1.542.805 0 1.296.638 1.296 1.542 0 .893-.49 1.522-1.296 1.522-.795 0-1.315-.648-1.315-1.522Z"
                fill="#9F2089"
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
            {/* Trusted */}
          </span>
        </div>
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
