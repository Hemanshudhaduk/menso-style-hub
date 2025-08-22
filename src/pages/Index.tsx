import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Banner } from '@/components/Banner';
import { ProductCard } from '@/components/ProductCard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { CartSidebar } from '@/components/CartSidebar';
import { Notification } from '@/components/ui/notification';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { Product, PageType } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePage, setActivePage] = useState<PageType>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  const { toast } = useToast();

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({ show: true, message: 'Added to cart!' });
    
    // Auto-close cart after a short delay
    setTimeout(() => {
      setIsCartOpen(false);
    }, 1500);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when selecting category
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handlePageChange = (page: PageType) => {
    setActivePage(page);
    if (page === 'orders') {
      toast({
        title: "My Orders",
        description: "Orders page functionality would be implemented here.",
      });
    } else if (page === 'help') {
      toast({
        title: "Help & Support",
        description: "Help page functionality would be implemented here.",
      });
    } else if (page === 'account') {
      toast({
        title: "My Account",
        description: "Account page functionality would be implemented here.",
      });
    } else if (page === 'categories') {
      // Reset to show all categories
      setSelectedCategory('all');
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => toast({ title: "Menu", description: "Menu functionality would be implemented here." })}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main>
        {/* Categories */}
        <CategoryGrid onCategoryClick={handleCategoryClick} />

        {/* Banner */}
        <Banner />

        {/* Products Section */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {selectedCategory === 'all' ? 'Products For You' : 
               selectedCategory === 'kurtis' ? 'Kurtis Collection' :
               selectedCategory === 'combo2' ? 'Kurti 2 Combo Pack' :
               'Kurti 3 Combo Pack'}
            </h3>
            {searchQuery && (
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} results for "{searchQuery}"
              </span>
            )}
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No products found for your search.' : 'No products in this category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
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
        onClose={() => setNotification({ show: false, message: '' })}
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