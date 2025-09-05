import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
  onCategoryClick: (categoryId: string) => void;
}

// Optional mapping if some categories still want icons; otherwise use images
const iconMap: Record<string, string> = {};

export const CategoryGrid = ({ onCategoryClick }: CategoryGridProps) => {
  return (
    <div className="bg-card px-2 py-3">
      <div className="flex justify-between gap-2">
        {categories.map((category) => {
          const imageSrc = (category as any).image as string | undefined;
          return (
            <div
              key={category.id}
              className="text-center cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border mb-2 mx-auto">
                {imageSrc ? (
                  <img src={imageSrc} alt={category.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={cn("w-full h-full flex items-center justify-center", category.bgColor)} />
                )}
              </div>
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};