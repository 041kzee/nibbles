export interface Product {
  id: number;
  slug: string;
  name: string;
  category: 'Single Ingredient' | 'Fruit & Grain' | 'Grain & Multigrain' | 'Nutrition Boosters' | 'Baby Snacks';
  age: '6+ Months' | '8+ Months' | '12+ Months';
  stage: 'Stage 1' | 'Stage 2' | 'Stage 3';
  price: number;
  mrp: number;
  weight: string;
  desc: string;
  badge?: string;
  isNew?: boolean;
  featuredOrder: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  galleryImages: string[];
  ingredients: string;
  benefits: string[];
  nutritionValues: {
    energy: string;
    carbs: string;
    naturalSugars: string;
    fiber: string;
    protein: string;
    keyMineral: string;
  };
  preparationSteps: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  packSize: '200g Pouch' | 'Pack of 2' | 'Pack of 3';
  unitPrice: number;
}

export type PageRoute = 'home' | 'shop' | 'shop-by-age' | 'product-detail' | 'cart' | 'checkout' | 'our-story';
