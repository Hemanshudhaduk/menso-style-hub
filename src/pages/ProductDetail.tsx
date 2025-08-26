import { useState } from "react";
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const { isLiked, toggleLike } = useWishlist();
  const { toast } = useToast();

  // Dynamic state for UI actions
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  // Fetch product by id
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  // Gallery: Always use product.images[] if available, otherwise [product.image]
  const galleryImages = product.images?.length
    ? product.images
    : [product.image];

  // Recommended products: same category, not current id, up to 4/6 if kurtis
  const recommendedLimit = product.category === "kurtis" ? 6 : 4;
  const recommendedProducts = products
    .filter(
      (p) =>
        p.category === product.category && String(p.id) !== String(product.id)
    )
    .slice(0, recommendedLimit);

  // Cart/Wishlist actions
  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setNotification({ show: true, message: "Added to cart!" });
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    navigate("/checkout");
  };

  const handleToggleLike = () => {
    toggleLike(Number(product.id));
    setNotification({
      show: true,
      message: isLiked(Number(product.id)) ? "Removed from likes" : "Added to likes",
    });
  };

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
                className="text-3xl font-extrabold lowercase tracking-tight"
                style={{ color: "#6D106A" }}
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
              <Share className="h-6 w-6 text-gray-400 cursor-pointer" />
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
              <Share className="h-6 w-6 text-gray-400 cursor-pointer" />
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
              ₹{product.price + 596} with 2 Special Offers
            </p>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {product.rating} <Star className="w-3 h-3 ml-1 fill-current" />
              </Badge>
              <span className="text-sm text-gray-500 ml-2">
                {product.reviews} ratings
              </span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Trusted
            </Badge>
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

        {/* Product Details: dynamic rendering for kurta/pants/dupatta */}
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

      {/* Notification */}
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
