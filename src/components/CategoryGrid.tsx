import { Grid3X3, Shirt, Layers, Package } from 'lucide-react';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
  onCategoryClick: (categoryId: string) => void;
}

const iconMap = {
  Grid3X3,
  Shirt,
  Layers,
  Package
};

export const CategoryGrid = ({ onCategoryClick }: CategoryGridProps) => {
  return (
    <div className="bg-card px-4 py-4">
      <div className="flex justify-around">
        {categories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          return (
            <div
              key={category.id}
              className="text-center cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className={cn(
                "w-16 h-16 rounded-lg flex items-center justify-center mb-2",
                category.bgColor
              )}>
                <Icon className={cn("w-8 h-8", category.iconColor)} />
              </div>
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};