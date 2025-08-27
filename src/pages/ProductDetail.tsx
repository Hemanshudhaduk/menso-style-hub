import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/components/ui/notification";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const { isLiked, toggleLike } = useWishlist();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const { isLoggedIn } = useUser();

  // Fetch product by id
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  // Gallery logic
  const galleryImages = product.images?.length
    ? product.images
    : [product.image];
  const recommendedLimit = product.category === "kurtis" ? 6 : 4;
  const recommendedProducts = products
    .filter(
      (p) =>
        p.category === product.category && String(p.id) !== String(product.id)
    )
    .slice(0, recommendedLimit);

  // Cart/Wishlist actions
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Optionally save intended action before redirecting
      localStorage.setItem("postSignupAction", "addToCart");
      navigate("/signup");
      return;
    }
    addToCart(product, selectedSize);
    setNotification({ show: true, message: "Added to cart!" });
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      localStorage.setItem("postSignupAction", "buyNow");
      navigate("/signup");
      return;
    }
    addToCart(product, selectedSize);
    navigate("/checkout");
  };

  const handleToggleLike = () => {
    toggleLike(Number(product.id));
    setNotification({
      show: true,
      message: isLiked(Number(product.id))
        ? "Removed from likes"
        : "Added to likes",
    });
  };

  // Share logic
  const getShareUrl = () => {
    return `${window.location.origin}/product/${product.id}`;
  };
  const shareMessage = `Check out this product on meesho: ${getShareUrl()}`;

  const handleShareClick = async () => {
    // Close any previously open menus
    setIsShareMenuOpen(false);
    // Try native sharing API
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareMessage,
          url: getShareUrl(),
        });
        return;
      } catch (error) {
        // Continue to fallback if sharing fails
      }
    }
    setIsShareMenuOpen(true);
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    toast({ title: "Link copied to clipboard!" });
    setIsShareMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-3">
                <ArrowLeft className="text-gray-600 h-6 w-6" />
              </button>
              <h1
                className="text-3xl font-extrabold lowercase tracking-tight cursor-pointer"
                style={{ color: "#6D106A" }}
                onClick={() => navigate("/")} // 🔥 no refresh
              >
                meesho
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleToggleLike}>
                <Heart
                  className={`h-6 w-6 cursor-pointer ${
                    isLiked(Number(product.id))
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {/* Share Button */}
              <div className="relative">
                <Share
                  className="h-6 w-6 text-gray-400 cursor-pointer"
                  onClick={handleShareClick}
                />
                {/* Share Menu Dropdown */}
                {isShareMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        window.open(
                          `https://wa.me/?text=${encodeURIComponent(
                            shareMessage
                          )}`,
                          "_blank"
                        );
                        setIsShareMenuOpen(false);
                      }}
                    >
                      Share on WhatsApp
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            getShareUrl()
                          )}`,
                          "_blank"
                        );
                        setIsShareMenuOpen(false);
                      }}
                    >
                      Share on Facebook
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            getShareUrl()
                          )}&text=${encodeURIComponent(product.name)}`,
                          "_blank"
                        );
                        setIsShareMenuOpen(false);
                      }}
                    >
                      Share on Twitter
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={handleCopyLink}
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>

              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="text-fashion-purple h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-fashion-pink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pb-24">
        {/* Product Images - main and thumbnails */}
        <div className="bg-white">
          <div className="aspect-[3/4] w-full">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-3">
              {galleryImages.length}{" "}
              {galleryImages.length === 1 ? "Image" : "Images"}
            </p>
            <div className="flex space-x-2 overflow-x-auto">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-16 h-20 rounded border-2 cursor-pointer ${
                    index === selectedImageIndex
                      ? "border-fashion-purple"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Product Info */}
        <div className="bg-white mt-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center space-x-3">
              <button onClick={handleToggleLike}>
                <Heart
                  className={`h-6 w-6 cursor-pointer ${
                    isLiked(Number(product.id))
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
              {/* Second share button in info (same as header, optional) */}
              <Share
                className="h-6 w-6 text-gray-400 cursor-pointer"
                onClick={handleShareClick}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}.00
            </span>
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice}.00
            </span>
            <span className="text-lg text-green-600 font-medium">
              {product.discount}% off
            </span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <p className="text-green-700 font-medium">
              ₹{product.price + 299} with 2 Special Offers
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <span className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                {product.rating}
                <Star className="w-4 h-4 fill-current text-white" />
              </span>
              <span className="text-sm text-gray-500 ml-2 font-bold">
                ({product.reviews})
              </span>
            </div>
            {/* svg ... omitted, same as your code ... */}
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
          <div className="mb-6">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded whitespace-nowrap inline-flex items-center">
              Free Delivery
            </span>
          </div>
        </div>
        {/* Size Selection */}
        <div className="bg-white mt-2 p-4">
          <h3 className="text-lg font-semibold mb-4">Select Size</h3>
          <div className="flex space-x-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border ${
                  selectedSize === size
                    ? "border-fashion-purple bg-fashion-purple/10 text-fashion-purple"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="bg-white mt-2 p-4">
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Model is Wearing:</span>{" "}
              {selectedSize} Size
            </p>
            <p>
              <span className="font-medium">Care:</span> {product.care}
            </p>
            <p>
              <span className="font-medium">Shipping Info:</span>{" "}
              {product.shipping}
            </p>
          </div>
          {product.details?.kurta?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Kurta:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {product.details.kurta.map((text, idx) => (
                  <li key={idx}>• {text}</li>
                ))}
              </ul>
            </div>
          )}
          {product.details?.pants?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-3">Pants:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {product.details.pants.map((text, idx) => (
                  <li key={idx}>• {text}</li>
                ))}
              </ul>
            </div>
          )}
          {product.details?.dupatta?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-3">Dupatta:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {product.details.dupatta.map((text, idx) => (
                  <li key={idx}>• {text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="bg-white mt-2 p-4">
            <h3 className="text-lg font-semibold mb-4">Products For You</h3>
            <div className="grid grid-cols-2 gap-4">
              {recommendedProducts.map((rp) => (
                <ProductCard
                  key={rp.id}
                  product={rp}
                  onProductClick={(p) => navigate(`/product/${p.id}`)}
                  onAddToCart={(p) => {
                    addToCart(p, selectedSize);
                    setNotification({ show: true, message: "Added to cart!" });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Notification
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, message: "" })}
        duration={2000}
      />
      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex space-x-3">
          <Button
            variant="fashionOutline"
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="fashion"
            size="lg"
            className="flex-1"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
