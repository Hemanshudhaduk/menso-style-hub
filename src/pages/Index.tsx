import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Banner } from "@/components/Banner";
import { ProductCard } from "@/components/ProductCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CartSidebar } from "@/components/CartSidebar";
import { Notification } from "@/components/ui/notification";
import { GaneshOfferBanner } from "@/components/GaneshOfferBanner";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";
import { Product, PageType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Home,
  ShoppingCart,
  HelpCircle,
  User,
  Grid2X2,
  CreditCard,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePage, setActivePage] = useState<PageType>("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const { toast } = useToast();
  const { user } = useUser();

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      navigate("/signup");
      return;
    }
    addToCart(product);
    setNotification({ show: true, message: "Added to cart!" });

    // Auto-close cart after a short delay
    setTimeout(() => {
      setIsCartOpen(false);
    }, 1500);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // Clear search when selecting category
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/signup");
      return;
    }
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handlePageChange = (page: PageType) => {
    setActivePage(page);
    if (page === "orders") {
      navigate("/orders");
    } else if (page === "help") {
      navigate("/help");
    } else if (page === "account") {
      navigate(user ? "/account" : "/signup");
    } else if (page === "categories") {
      navigate("/categories");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 px-2 sm:px-4 md:px-8">
      {/* Header */}
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Slide-out Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="w-full sm:w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <h1
              className="text-3xl font-extrabold lowercase tracking-tight cursor-pointer"
              style={{ color: "#6D106A" }}
              onClick={() => navigate("/")} // 🔥 no refresh
            >
              meesho
            </h1>{" "}
          </SheetHeader>
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/");
              }}
            >
              <Home className="w-5 h-5" /> Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                setSelectedCategory("all");
                setActivePage("categories");
              }}
            >
              <Grid2X2 className="w-5 h-5" /> Categories
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/likes");
              }}
            >
              <Heart className="w-5 h-5" /> Likes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                setIsCartOpen(true);
              }}
            >
              <ShoppingCart className="w-5 h-5" /> Cart
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/checkout");
              }}
            >
              <CreditCard className="w-5 h-5" /> Checkout
            </Button>
            <div className="h-px bg-border my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/help");
              }}
            >
              <HelpCircle className="w-5 h-5" /> Help
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => {
                setIsMenuOpen(false);
                navigate(user ? "/account" : "/signup");
              }}
            >
              <User className="w-5 h-5" /> Account
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main>
        <div className="pt-4">
          <GaneshOfferBanner />
        </div>
        {/* Categories */}
        <div className="mb-4">
          <CategoryGrid onCategoryClick={handleCategoryClick} />
        </div>

        {/* Banner */}
        <div className="mb-4">
          <Banner />
        </div>

        {/* Products Section */}
        <div className="py-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-semibold">
              {selectedCategory === "all"
                ? "Products For You"
                : selectedCategory === "kurtis"
                ? "Kurtis Collection"
                : selectedCategory === "combo2"
                ? "Kurti 2 Combo Pack"
                : "Sarres"}
            </h3>
            {searchQuery && (
              <span className="text-sm text-muted-foreground mt-2 sm:mt-0">
                {filteredProducts.length} results for "{searchQuery}"
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No products found for your search."
                  : "No products in this category."}
              </p>
            </div>
          ) : (
            // Responsive products grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
      />

      {/* Simple Notification */}
      <Notification
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, message: "" })}
        duration={2000}
      />

      {/* Bottom Navigation */}
      <BottomNavigation
        activePage={activePage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Index;
