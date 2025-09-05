import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Share } from "lucide-react";
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
  const galleryImages = product.images?.length ? product.images : [product.image];
  const recommendedLimit = product.category === "kurtis" ? 6 : 4;
  const recommendedProducts = (() => {
    const sameCategory = products.filter(
      (p) => p.category === product.category && String(p.id) !== String(product.id)
    );
    // Shuffle randomly on each visit to detail page
    for (let i = sameCategory.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sameCategory[i], sameCategory[j]] = [sameCategory[j], sameCategory[i]];
    }
    return sameCategory.slice(0, recommendedLimit);
  })();

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
    return `${window.location.origin}/product/${product.id}`;
  };
  const shareMessage = `Check out this product on meesho: ${getShareUrl()}`;

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
      } catch (error) {}
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
        <div className="px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-2 sm:mr-3">
                <ArrowLeft className="text-gray-600 h-6 w-6" />
              </button>
              <h1
                className="text-xl sm:text-3xl font-extrabold lowercase tracking-tight cursor-pointer"
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
          {/* Mobile-first single column layout inside mobile frame */}
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col justify-between">
              <div className="aspect-[3/4] w-full rounded overflow-hidden bg-gray-50">
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  {galleryImages.length}{" "}
                  {galleryImages.length === 1 ? "Image" : "Images"}
                </p>
                <div className="flex space-x-2 overflow-x-auto">
                  {galleryImages.map((img, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-11 h-16 sm:w-16 sm:h-20 rounded border-2 cursor-pointer ${
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
            <div className="w-full flex flex-col justify-between">
              <div className="p-4 flex flex-col justify-center">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{product.price}.00
                  </span>
                  {product.price !== product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.originalPrice}.00
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
                  <span className="text-sm text-gray-500 ml-2 font-bold">
                    ({product.reviews})
                  </span>
                  <span className="text-xs font-medium whitespace-nowrap inline-flex items-center gap-1">
                    {/* Trusted SVG ... */}
                    <svg width="55" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* SVG paths ... */}
                    </svg>
                  </span>
                </div>
                <div className="mb-4">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded whitespace-nowrap inline-flex items-center">
                    Free Delivery
                  </span>
                </div>
                {/* Size Selection */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
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
                {/* Inline actions (visible above the fixed bar too) */}
                <div className="flex space-x-3 mt-4">
                  <Button variant="fashionOutline" size="lg" className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="fashion" size="lg" className="flex-1" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white mt-2 p-4 max-w-4xl mx-auto rounded">
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
          {product.details?.ProductDetails?.length > 0 && (
            <div className="mt-6">
              {/* <h4 className="font-semibold mb-3">ProductDetails:</h4> */}
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
          <div className="bg-white mt-2 p-4 rounded">
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

      {/* Fixed Bottom Actions on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40 md:hidden">
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
