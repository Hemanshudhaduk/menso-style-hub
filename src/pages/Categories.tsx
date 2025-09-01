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
        <div
          className="
            grid gap-3
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {/* Category: Kurtis */}
          <button
            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition"
            onClick={() => navigate("/category/kurtis")}
          >
            <span className="flex items-center gap-3">
              <Shirt className="w-5 h-5 text-fashion-purple" />
              <span className="font-medium">Kurtis</span>
            </span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>

          {/* Category: Kurti 2 Combo */}
          <button
            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition"
            onClick={() => navigate("/category/combo2")}
          >
            <span className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-fashion-purple" />
              <span className="font-medium">Kurti 2 Combo</span>
            </span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>

          {/* Category: Sarees */}
          <button
            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition"
            onClick={() => navigate("/category/combo3")}
          >
            <span className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-fashion-purple" />
              <span className="font-medium">Sarees</span>
            </span>
            <span className="text-xs text-muted-foreground">View</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Categories;
