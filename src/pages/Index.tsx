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
import { shuffleArrayImmutable } from "@/lib/utils";
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
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  Filter as FilterIcon,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePage, setActivePage] = useState<PageType>("home");
  const [sortOrder, setSortOrder] = useState<"relevance" | "priceAsc" | "priceDesc" | "rating">("relevance");
  const [gender, setGender] = useState<"all" | "women">("all");
  const [openMenu, setOpenMenu] = useState<"sort" | "category" | "gender" | null>(null);
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

    // Filter by gender (simple mapping: kurtis/combo2/combo3 -> women)
    if (gender !== "all") {
      const womenCategories = new Set(["kurtis", "combo2", "combo3"]);
      filtered = filtered.filter((p) => womenCategories.has(p.category));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "priceAsc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceDesc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating") {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    }

    // Default random ordering when relevance selected or no sort
    if (sortOrder === "relevance") {
      // Seed by day to keep order stable for a session; change daily
      const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
      filtered = shuffleArrayImmutable(filtered, daySeed);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortOrder, gender]);

  // include sortOrder and gender in memo deps

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
    <div className="min-h-screen bg-background bg-white pb-20">
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
        {/* Location notice */}
        <div className="w-full bg-white border-y mb-3">
          <div className="flex items-center gap-2 px-3 py-3 text-sm">
            <MapPin className="w-4 h-4 text-fashion-purple" />
            <span className="text-gray-700 flex-1">
              Add delivery location to check extra discount
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {/* <ChevronRight className="w-4 h-4 text-gray-400 -ml-2" /> */}
          </div>
        </div>
        {/* <div className="pt-4">
          <GaneshOfferBanner />
        </div> */}
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
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

          {/* Filter toolbar */}
          <div className="grid grid-cols-4 gap-2 mb-3 relative">
            <button className="flex items-center justify-center gap-1 py-2 text-sm bg-white border rounded" onClick={() => setOpenMenu(openMenu === 'sort' ? null : 'sort')}>
              <SlidersHorizontal className="w-4 h-4" />
              Sort
            </button>
            <button className="flex items-center justify-center gap-1 py-2 text-sm bg-white border rounded" onClick={() => setOpenMenu(openMenu === 'category' ? null : 'category')}>
              Category
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-1 py-2 text-sm bg-white border rounded" onClick={() => setOpenMenu(openMenu === 'gender' ? null : 'gender')}>
              Gender
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-1 py-2 text-sm bg-white border rounded">
              <FilterIcon className="w-4 h-4" />
              Filters
            </button>

            {openMenu === 'sort' && (
              <div className="absolute z-20 top-12 left-0 w-full bg-white border rounded shadow">
                {[
                  { id: 'relevance', label: 'Relevance' },
                  { id: 'priceAsc', label: 'Price: Low to High' },
                  { id: 'priceDesc', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Top Rated' },
                ].map((o) => (
                  <button key={o.id} className={`w-full text-left px-3 py-2 text-sm ${sortOrder === o.id ? 'bg-gray-100' : ''}`} onClick={() => { setSortOrder(o.id as "relevance" | "priceAsc" | "priceDesc" | "rating"); setOpenMenu(null); }}>
                    {o.label}
                  </button>
                ))}
              </div>
            )}

            {openMenu === 'category' && (
              <div className="absolute z-20 top-12 left-0 w-full bg-white border rounded shadow grid grid-cols-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'kurtis', label: 'Kurtis' },
                  { id: 'combo2', label: 'Kurti 2 Combo' },
                  { id: 'combo3', label: 'Sarees' },
                ].map((c) => (
                  <button key={c.id} className={`text-left px-3 py-2 text-sm ${selectedCategory === c.id ? 'bg-gray-100' : ''}`} onClick={() => { setSelectedCategory(c.id); setOpenMenu(null); }}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {openMenu === 'gender' && (
              <div className="absolute z-20 top-12 left-0 w-full bg-white border rounded shadow">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'women', label: 'Women' },
                ].map((g) => (
                  <button key={g.id} className={`w-full text-left px-3 py-2 text-sm ${gender === g.id ? 'bg-gray-100' : ''}`} onClick={() => { setGender(g.id as "all" | "women"); setOpenMenu(null); }}>
                    {g.label}
                  </button>
                ))}
              </div>
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
            // Force 2-column grid across all viewports
            <div className="grid grid-cols-2 gap-1">
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
