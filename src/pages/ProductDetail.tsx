import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Share, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const { isLoggedIn } = useUser();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Fetch product by id
  const product = products.find((p) => String(p.id) === String(id));

  // Gallery logic (safe if product is undefined)
  const galleryImages = useMemo(() => {
    if (!product) return [] as string[];
    if (product.images?.length) return product.images;
    return product.image ? [product.image] : [];
  }, [product]);
  const recommendedLimit = product?.category === "kurtis" ? 6 : 4;
  const recommendedProducts = product
    ? (() => {
        const sameCategory = products.filter(
          (p) => p.category === product.category && String(p.id) !== String(product.id)
        );
        // Shuffle randomly on each visit to detail page
        for (let i = sameCategory.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sameCategory[i], sameCategory[j]] = [sameCategory[j], sameCategory[i]];
        }
        return sameCategory.slice(0, recommendedLimit);
      })()
    : [];

  // Cart/Wishlist actions
  const handleAddToCart = () => {
    if (!isLoggedIn) {
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
    return product ? `${window.location.origin}/product/${product.id}` : window.location.origin;
  };
  const shareMessage = product ? `Check out this product on meesho: ${getShareUrl()}` : "";

  const handleShareClick = async () => {
    setIsShareMenuOpen(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareMessage,
          url: getShareUrl(),
        });
        return;
      } catch (error) {
        console.error(error);
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

  // No autoplay; user will swipe or tap dots to navigate images

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header - Mobile View Only */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-3">
                <ArrowLeft className="text-gray-600 h-6 w-6" />
              </button>
              <h1
                className="text-xl font-extrabold lowercase tracking-tight cursor-pointer"
                style={{ color: "#6D106A" }}
                onClick={() => navigate("/")}
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
                {isShareMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
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
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-b-lg"
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
        {/* Product Images - Mobile Optimized */}
        <div className="bg-white">
          <div className="w-full">
            {/* Main Product Image */}
            <div
              className="aspect-[3/4] w-full bg-gray-50 relative"
              onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                if (touchStartX == null) return;
                const endX = e.changedTouches[0]?.clientX ?? touchStartX;
                const delta = endX - touchStartX;
                if (Math.abs(delta) > 40) {
                  if (delta > 0) handlePrevImage(); else handleNextImage();
                }
                setTouchStartX(null);
              }}
            >
              <img
                src={galleryImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to image ${idx + 1}`}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`${
                        idx === selectedImageIndex 
                          ? "w-2.5 h-2.5 bg-white" 
                          : "w-2 h-2 bg-white/60"
                      } rounded-full transition-all duration-200`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {galleryImages.length}{" "}
                {galleryImages.length === 1 ? "Image" : "Images"}
              </p>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      index === selectedImageIndex
                        ? "border-fashion-purple shadow-md"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white p-4">
          <h1 className="text-xl font-semibold text-gray-900 mb-3">
            {product.name}
          </h1>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.price !== product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-lg text-green-600 font-medium">
              {product.discount}% off
            </span>
          </div>

          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <p className="text-green-700 font-medium">
              ₹{product.price + 299} with 2 Special Offers
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
              {product.rating}
              <Star className="w-4 h-4 fill-current text-white" />
            </span>
            <span className="text-sm text-gray-500 font-bold">
              ({product.reviews})
            </span>
          </div>

          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium">
              Free Delivery
            </span>
            <span className="bg-purple-100 text-fashion-purple text-xs px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              7-Day Return Policy
            </span>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "border-fashion-purple bg-fashion-purple/10 text-fashion-purple"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
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
              <ul className="space-y-1 text-sm text-gray-600">
                {product.details.kurta.map((text, idx) => (
                  <li key={idx}>• {text}</li>
                ))}
              </ul>
            </div>
          )}
          
          {product.details?.ProductDetails?.length > 0 && (
            <div className="mt-6">
              <ul className="space-y-1 text-sm text-gray-600">
                {product.details.ProductDetails.map((text, idx) => (
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
            <div className="grid grid-cols-2 gap-3">
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

      {/* Fixed Bottom Actions - Shows on ALL screen sizes */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="max-w-md mx-auto p-4">
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
    </div>
  );
};

export default ProductDetail;