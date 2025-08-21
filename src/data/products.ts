import { Product } from '@/types';
import kurtiWhitePink from '@/assets/kurti-white-pink.jpg';
import kurtiPinkCotton from '@/assets/kurti-pink-cotton.jpg';
import blackCottonMaxi from '@/assets/black-cotton-maxi.jpg';
import kurtiCombo2 from '@/assets/kurti-combo-2.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: "white & pink fairytale cotton suit set",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.0,
    reviews: 1191,
    image: kurtiWhitePink,
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Beautiful cotton suit set perfect for casual and formal occasions.",
    fabric: "Cotton (pure cotton)",
    care: "DRY CLEAN",
    shipping: "12-15 Days"
  },
  {
    id: 2,
    name: "vamika pink cotton suit set",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.5,
    reviews: 642,
    image: kurtiPinkCotton,
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Elegant pink cotton suit set with traditional embroidery.",
    fabric: "Cotton",
    care: "DRY CLEAN",
    shipping: "12-15 Days"
  },
  {
    id: 3,
    name: "Kurti Combo Set of 2",
    price: 99,
    originalPrice: 1999,
    discount: 95,
    rating: 4.0,
    reviews: 1358,
    image: kurtiCombo2,
    category: "combo2",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Set of 2 beautiful kurtis in different colors and patterns.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    shipping: "10-12 Days"
  },
  {
    id: 4,
    name: "aamodini black cotton maxi",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.5,
    reviews: 5448,
    image: blackCottonMaxi,
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Stylish black cotton maxi dress for modern women.",
    fabric: "Cotton",
    care: "Machine Wash",
    shipping: "12-15 Days"
  },
  {
    id: 5,
    name: "KURTI 3 COMBO PACK",
    price: 129,
    originalPrice: 3000,
    discount: 96,
    rating: 4.8,
    reviews: 1803,
    image: kurtiCombo2, // Reusing for now
    category: "combo3",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium combo pack of 3 designer kurtis.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    shipping: "10-12 Days"
  },
  {
    id: 6,
    name: "pink swan embroidered dress",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.4,
    reviews: 6744,
    image: kurtiPinkCotton,
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Beautiful pink dress with swan embroidery.",
    fabric: "Cotton",
    care: "Hand Wash",
    shipping: "12-15 Days"
  }
];

export const categories = [
  {
    id: 'all',
    name: 'Categories',
    icon: 'Grid3X3',
    bgColor: 'bg-fashion-pink/10',
    iconColor: 'text-fashion-pink'
  },
  {
    id: 'kurtis',
    name: 'Kurtis',
    icon: 'Shirt',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500'
  },
  {
    id: 'combo2',
    name: 'Kurti 2 Com...',
    icon: 'Layers',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500'
  },
  {
    id: 'combo3',
    name: 'Kurti 3 Com...',
    icon: 'Package',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500'
  }
];