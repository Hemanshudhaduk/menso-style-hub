import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shirt, Layers3 } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate("/")} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Categories</h2>
        </div>
      </header>

      {/* Main */}
      <main className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Category: Western Dresses */}
          <button
            className="bg-white rounded-lg border p-3 flex flex-col items-center justify-center gap-2 hover:shadow-sm transition"
            onClick={() => navigate("/category/kurtis")}
          >
            <div className="w-14 h-14 rounded-full bg-fashion-purple/10 flex items-center justify-center">
              <Shirt className="w-6 h-6 text-fashion-purple" />
            </div>
            <span className="text-sm font-medium">Western Dresses</span>
          </button>

          {/* Category: Menswear */}
          <button
            className="bg-white rounded-lg border p-3 flex flex-col items-center justify-center gap-2 hover:shadow-sm transition"
            onClick={() => navigate("/category/combo2")}
          >
            <div className="w-14 h-14 rounded-full bg-fashion-purple/10 flex items-center justify-center">
              <Layers3 className="w-6 h-6 text-fashion-purple" />
            </div>
            <span className="text-sm font-medium">Menswear</span>
          </button>

          {/* Category: Ethnic wear */}
          <button
            className="bg-white rounded-lg border p-3 flex flex-col items-center justify-center gap-2 hover:shadow-sm transition"
            onClick={() => navigate("/category/combo3")}
          >
            <div className="w-14 h-14 rounded-full bg-fashion-purple/10 flex items-center justify-center">
              <Layers3 className="w-6 h-6 text-fashion-purple" />
            </div>
            <span className="text-sm font-medium">Ethnic wear</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Categories;
