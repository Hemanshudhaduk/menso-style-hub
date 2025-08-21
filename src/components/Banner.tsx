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
          className="bg-white text-fashion-purple hover:bg-white/90 px-6 rounded-full font-medium"
        >
          SHOP NOW
        </Button>
      </div>
    </div>
  );
};