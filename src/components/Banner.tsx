import { Button } from '@/components/ui/button';

export const Banner = () => {
  return (
    <div className="py-2">
      <div className="relative w-full overflow-hidden rounded-lg">
        {/* Image from public/ - replace with your asset name if different */}
        <img
          src="/banner-sale.webp"
          alt="Sale Banner"
          className="w-full h-auto block"
          onError={(e) => {
            // graceful fallback if image missing
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Optional CTA overlay (shown only if image loads) */}
        <div className="absolute right-4 bottom-4">
          <Button className="bg-white/95 text-purple-800 font-semibold rounded-xl px-4 py-1.5 text-sm shadow-md hover:bg-white transition">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};