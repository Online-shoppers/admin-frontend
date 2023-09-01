export interface BeerCreateType {
  name: string;
  type: string;
  price: number;
  description: string;
  quantity: number;
  image_url: string;
  archived: boolean;
  abv: number;
  country: string;
  volume: number;
  ibu: number;
}
