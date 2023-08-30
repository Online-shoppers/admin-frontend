import repository from '../../../api/repository';
import { AccessoryType } from '../types/accessory.type';
import { BeerType } from '../types/beer.type';

export interface ProductInfo {
  id: string;
  name: string;
}

export const getProductInfo = (category: string, id: string) => {
  category = category === 'accessories' ? 'accessory' : category;
  return repository.get<ProductInfo>(`/api/${category}/${id}`, {
    params: { id },
  });
};

export const updateAccessoryInfo = (id: string, data: AccessoryType) => {
  return repository.put<ProductInfo>(`/api/accessory/${id}`, data);
};

export const updateBeerInfo = (id: string, data: BeerType) => {
  return repository.put<ProductInfo>(`/api/accessory/${id}`, data);
};
