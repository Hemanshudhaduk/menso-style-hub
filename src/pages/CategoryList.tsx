import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

const CategoryList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const category = (id as string) || 'all';

  const filtered = useMemo(() => {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  }, [category]);

  const title = category === 'kurtis' ? 'Kurtis' : category === 'combo2' ? 'Kurti 2 Combo' : category === 'combo3' ? 'Sarees' : 'Products';

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/categories')} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </header>

      <main className="p-4">
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No products.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onProductClick={(prod) => navigate(`/product/${prod.id}`)}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryList;
