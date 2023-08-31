import { Product } from '../../products/types/product.type';

export interface BeerType extends Product {
  id: string;
  abv: number;
  country: string;
  volume: number;
  ibu: number;
}
