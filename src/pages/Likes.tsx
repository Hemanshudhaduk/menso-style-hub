import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

const Likes = () => {
  const navigate = useNavigate();
  const { likedIds } = useWishlist();
  const { addToCart } = useCart();

  const likedProducts = useMemo(
    () => products.filter((p) => likedIds.includes(Number(p.id))),
    [likedIds]
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 py-3 bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Liked Products</h2>
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
        </div>
      </div>

      {/* Main */}
      <main className="p-4">
        {likedProducts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No liked products yet.
          </div>
        ) : (
          <div
            className="
              grid gap-4
              grid-cols-2
            "
          >
            {likedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={(p) => navigate(`/product/${p.id}`)}
                onAddToCart={(p) => addToCart(p)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Likes;
