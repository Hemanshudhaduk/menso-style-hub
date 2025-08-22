import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Notification = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 2000 
}: NotificationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 200); // Wait for animation to complete
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-200 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-64">
        <Check className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button 
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 200);
          }}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
