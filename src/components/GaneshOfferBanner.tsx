import { Sparkles } from 'lucide-react';

interface GaneshOfferBannerProps {
  className?: string;
}

export const GaneshOfferBanner = ({ className }: GaneshOfferBannerProps) => {
  return (
    <div className={`relative overflow-hidden rounded-lg p-4 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white shadow-md ${className || ''}`}>
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
      <div className="relative flex items-center gap-3">
        <Sparkles className="w-6 h-6" />
        <div>
          <div className="text-sm uppercase tracking-wide"> Special Offer</div>
          <div className="text-lg font-semibold leading-tight">Buy 3+ items and get 30% OFF on the whole bill</div>
          <div className="text-xs text-white/90">Auto-applied at checkout • Limited time</div>
        </div>
      </div>
    </div>
  );
};
