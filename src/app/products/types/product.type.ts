import { ProductCategories } from '../enums/product-categories.enum';

export interface Product {
  id: string;
  created: number;
  updated: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  quantity: number;
  category: ProductCategories;
  rating: number;
  reviews_amount: number;
  archived: boolean;
}
