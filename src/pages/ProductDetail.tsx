import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    navigate('/checkout');
  };

  // Mock similar products (in real app, this would be filtered by category)
  const similarProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 5);

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
              <h1 className="text-2xl font-bold text-fashion-purple">menso</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="text-red-500 h-6 w-6 cursor-pointer" />
              <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
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
        {/* Product Images */}
        <div className="bg-white">
          <div className="aspect-[3/4] w-full">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Similar Product Images */}
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-3">7 Similar Products</p>
            <div className="flex space-x-2 overflow-x-auto">
              {[product, ...similarProducts].map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex-shrink-0 w-16 h-20 rounded border-2 cursor-pointer ${
                    index === selectedImageIndex ? 'border-fashion-purple' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
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
            <h1 className="text-xl font-semibold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-3">
              <Heart className="h-6 w-6 text-gray-400 cursor-pointer" />
              <Share className="h-6 w-6 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}.00</span>
            <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}.00</span>
            <span className="text-lg text-green-600 font-medium">{product.discount}% off</span>
          </div>

          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <p className="text-green-700 font-medium">₹675 with 2 Special Offers</p>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {product.rating} <Star className="w-3 h-3 ml-1 fill-current" />
              </Badge>
              <span className="text-sm text-gray-500 ml-2">
                {product.reviews} ratings and 50 reviews
              </span>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">Trusted</Badge>
          </div>

          <p className="text-green-600 font-medium mb-6">Free Delivery</p>
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
                    ? 'border-fashion-purple bg-fashion-purple/10 text-fashion-purple'
                    : 'border-gray-300 text-gray-600'
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
            <p><span className="font-medium">Model is Wearing:</span> S Size</p>
            <p><span className="font-medium">Model Height:</span> 5.5</p>
            <p><span className="font-medium">Care:</span> {product.care}</p>
            <p><span className="font-medium">Shipping Info:</span> {product.shipping}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Kurta:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Fabric - Cotton (pure cotton)</li>
              <li>• kali cut</li>
              <li>• Kurta Length - 47-48"</li>
              <li>• Front Neck - 7.5</li>
              <li>• Back Neck - "Closed"</li>
              <li>• Sleeves - 24" inches</li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-3">pants:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Fabric - Cotton</li>
              <li>• Length - 38-40"</li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-3">dupatta:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Fabric- Mul Mul</li>
              <li>• length- 2.5 mtr</li>
            </ul>
          </div>
        </div>
      </main>

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