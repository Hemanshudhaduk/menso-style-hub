import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "react-router-dom";


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
  onSearchChange,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { likedIds } = useWishlist();
  const isLikesPage = location.pathname === "/likes";

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
            <h1
              className="text-3xl font-extrabold lowercase tracking-tight cursor-pointer"
              style={{ color: "#6D106A" }}
              onClick={() => navigate("/")} // 🔥 no refresh
            >
              meesho
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(isLikesPage ? "/" : "/likes")}
            >
              <Heart
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                strokeWidth={0}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-6 h-6 text-fashion-purple" fill="currentColor" strokeWidth={0} />
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
              placeholder="Search for Ethnic wear, Western Dresses, Menswear, etc."
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
