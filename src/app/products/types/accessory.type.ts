import { Product } from '../../products/types/product.type';

export interface AccessoryType {
  name: string;
  price: number;
  description: string;
  quantity: number;
  image_url: string;
  weight: number;
  archived: boolean;
}
