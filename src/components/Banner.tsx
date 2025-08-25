import { Button } from '@/components/ui/button';

export const Banner = () => {
  return (
    <div className="px-4 py-2">
      <div className="bg-gradient-hero rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-1">MEGA BLOCKBUSTER SALE</h2>
        <p className="text-sm mb-4">Up to 50% Off • Daily Refreshing Skin Care</p>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white text-fashion-purple px-6 rounded-full font-medium transition-all duration-200 ease-out hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 hover:-translate-y-0.5"
        >
          SHOP NOW
        </Button>
      </div>
    </div>
  );
};