import { Product } from '@/types';

// Import product images
import kurtiWhitePink from '@/assets/kurti-white-pink.jpg';
import kurtiPinkCotton from '@/assets/kurti-pink-cotton.jpg';
import blackCottonMaxi from '@/assets/black-cotton-maxi.jpg';
import kurtiCombo2 from '@/assets/kurti-combo-2.jpg';

// Anarkali multiple images
import Anarkali from '@/assets/7tvi20/first_1.avif';
import Anarkali2 from '@/assets/7tvi20/first_1_2.webp';
import Anarkali3 from '@/assets/7tvi20/first_1_3.avif';
import Anarkali4 from '@/assets/7tvi20/first_1_4.avif';

import k816k_4 from '@/assets/4k816k/4k816k_4.webp';
import k816k_3 from '@/assets/4k816k/4k816k_3.webp';
import k816k_2 from '@/assets/4k816k/4k816k_2.webp';
import k816k_1 from '@/assets/4k816k/4k816k_1.webp';


import h7w1v_1 from '@/assets/2h7w1v/2h7w1v_1.webp';
import h7w1v_2 from '@/assets/2h7w1v/2h7w1v_2.webp';
import h7w1v_3 from '@/assets/2h7w1v/2h7w1v_3.webp';
import h7w1v_4 from '@/assets/2h7w1v/2h7w1v_4.webp';

export const products: Product[] = [
  {
    id: 1,
    name: "White & Pink Fairytale Cotton Suit Set",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.0,
    reviews: 1191,
    image: kurtiWhitePink,
    images: [kurtiWhitePink], // only main image
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Beautiful cotton suit set perfect for casual and formal occasions.",
    fabric: "Cotton (pure cotton)",
    care: "Dry Clean",
    shipping: "12-15 Days",
    details: {
      kurta: [
        "Fabric - Cotton (pure cotton)",
        "Kali cut design",
        "Kurta Length - 47-48 inch",
        "Front Neck - 7.5 inch",
        "Back Neck - Closed",
        "Sleeves - 24 inch"
      ],
      pants: [
        "Fabric - Cotton",
        "Length - 38-40 inch"
      ],
      dupatta: [
        "Fabric - Mul Mul",
        "Length - 2.5 mtr"
      ]
    }
  },
  {
    id: 2,
    name: "Vamika Pink Cotton Suit Set",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.5,
    reviews: 642,
    image: kurtiPinkCotton,
    images: [kurtiPinkCotton],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Elegant pink cotton suit set with traditional embroidery.",
    fabric: "Cotton",
    care: "Dry Clean",
    shipping: "12-15 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        "Kurta Length - 45 inch",
        "Round Neck with embroidery",
        "Sleeves - 22 inch"
      ],
      pants: ["Fabric - Cotton Blend", "Length - 38 inch"],
      dupatta: ["Fabric - Chiffon", "2.25 mtr embroidered"]
    }
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
    images: [kurtiCombo2],
    category: "combo2",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Set of 2 beautiful kurtis in different colors and patterns.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    shipping: "10-12 Days",
    details: {
      kurta: [
        "Fabric - Cotton Blend",
        "Combo of 2 Kurtis",
        "Casual Regular Fit"
      ]
    }
  },
  {
    id: 4,
    name: "Aamodini Black Cotton Maxi",
    price: 79,
    originalPrice: 1949,
    discount: 96,
    rating: 4.5,
    reviews: 5448,
    image: blackCottonMaxi,
    images: [blackCottonMaxi],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Stylish black cotton maxi dress for modern women.",
    fabric: "Cotton",
    care: "Machine Wash",
    shipping: "12-15 Days",
    details: {
      kurta: [
        "Fabric - Cotton",
        "Length - 52 inch",
        "Round Neck",
        "Sleeveless design"
      ]
    }
  },
  {
    id: 5,
    name: "Kurti 3 Combo Pack",
    price: 129,
    originalPrice: 3000,
    discount: 96,
    rating: 4.8,
    reviews: 1803,
    image: kurtiCombo2, // reusing for now
    images: [kurtiCombo2],
    category: "combo3",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium combo pack of 3 designer kurtis.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    shipping: "10-12 Days",
    details: {
      kurta: [
        "Fabric - Cotton Blend",
        "Set of 3 Designer Kurtis",
        "Perfect for festive and daily wear"
      ]
    }
  },
  {
    id: "7tvi20",
    name: "Anarkali",
    price: 99,
    originalPrice: 275,
    discount: 33,
    rating: 4.4,
    reviews: 6744,
    image: Anarkali,
    images: [Anarkali, Anarkali2, Anarkali3, Anarkali4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Beautiful blue Anarkali dress with swan embroidery.",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Dyed/ Washed", 
        "Combo of : Single",
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "4k816k",
    name: "Flared Purple Kurti",
    price: 99,
    originalPrice: 250,
    discount: 33,
    rating: 4.0,
    reviews: 2850,
    image: k816k_1,
    images: [k816k_1, k816k_2, k816k_3, k816k_4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL" ,"XXXL"],
    description: "Beyond Fashion Women's Solid Printed Round Pleated Flared Kurti (Purple)",
    fabric: "Rayon",
    care: "Hand Wash Machine Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Solid", 
        "Combo of : Single",
        "Fit Type : Regular",
        "Ocassion : Casual, Formal, Casual, Daily",
        "Packet contains : 1 readymade Kurti."
      ],
      pants: [],
      dupatta: []
    }
  },
  {
    id: "2h7w1v",
    name: "women kurta",
    price: 99,
    originalPrice: 264,
    discount: 33,
    rating: 3.9,
    reviews: 669,
    image: h7w1v_1,
    images: [h7w1v_1, h7w1v_2, h7w1v_3, h7w1v_4],
    category: "kurtis",
    sizes: ["S", "M", "L", "XL", "XXL","XXXL"],
    description: "Trendy Fabulous Kurtis ",
    fabric: "Rayon",
    care: "Hand Wash",
    shipping: "5-7 Days",
    details: {
      kurta: [
        "Fabric - Rayon",
        "Anarkali Style full flare",
        "Round Neck",
        "Length - 50 inch",
        "Sleeve Length - Three-Quarter Sleeves",
        "Pattern- Printed", 
        "Combo of : Single",
        "Fit Type : Regular",
        "Ocassion : Casual, Formal, Casual, Daily",
        "Packet contains : 1 readymade Kurti."
      ],
      pants: [],
      dupatta: []
    }
  },
  
];

// Categories
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
