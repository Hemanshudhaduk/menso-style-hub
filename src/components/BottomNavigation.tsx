import { Home, Grid3X3, Package, HelpCircle, User } from 'lucide-react';
import { PageType } from '@/types';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activePage: PageType;
  onPageChange: (page: PageType) => void;
}

const navItems = [
  { id: 'home' as PageType, name: 'Home', icon: Home },
  { id: 'categories' as PageType, name: 'Categories', icon: Grid3X3 },
  { id: 'orders' as PageType, name: 'My Orders', icon: Package },
  { id: 'help' as PageType, name: 'Help', icon: HelpCircle },
  { id: 'account' as PageType, name: 'Account', icon: User },
];

export const BottomNavigation = ({ activePage, onPageChange }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-30">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col items-center py-2 cursor-pointer transition-colors duration-200",
                isActive 
                  ? "text-fashion-purple" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};