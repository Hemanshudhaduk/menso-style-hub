import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick, onAddToCart }: ProductCardProps) => {
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
        <h3 className="text-sm font-medium mb-1 line-clamp-2 text-card-foreground">
          {product.name}
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-bold text-fashion-purple">₹{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          <span className="text-sm text-green-600 font-medium">{product.discount}% off</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
              {product.rating} <Star className="w-3 h-3 ml-1 fill-current" />
            </span>
            <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
          </div>
          <span className="text-xs text-green-600 font-medium whitespace-nowrap">Free Delivery</span>
        </div>
        <div className="mt-auto">
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
        </div>
      </div>
    </div>
  );
};