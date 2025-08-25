import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shirt, Layers3 } from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/')} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Categories</h2>
        </div>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-1 gap-3">
          <button
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm"
            onClick={() => navigate('/category/kurtis')}
          >
            <span className="flex items-center gap-3">
              <Shirt className="w-5 h-5 text-fashion-purple" />
              <span className="font-medium">Kurtis</span>
            </span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>
          <button
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm"
            onClick={() => navigate('/category/combo2')}
          >
            <span className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-fashion-purple" />
              <span className="font-medium">Kurti 2 Combo</span>
            </span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>
          <button
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm"
            onClick={() => navigate('/category/combo3')}
          >
            <span className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-fashion-purple" />
              <span className="font-medium">Kurti 3 Combo</span>
            </span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Categories;
