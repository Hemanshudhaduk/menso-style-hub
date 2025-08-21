import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ 
  cartItemCount, 
  onCartClick, 
  onMenuClick, 
  searchQuery, 
  onSearchChange 
}: HeaderProps) => {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onMenuClick}
              className="mr-3 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-fashion-purple">menso</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5 text-fashion-pink" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5 text-fashion-purple" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search for Sarees, Kurtis, Cosmetics, etc."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 focus:border-fashion-purple"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};