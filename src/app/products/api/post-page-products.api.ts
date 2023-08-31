import repository from '../../../api/repository';
import { AccessoryType } from '../types/accessory.type';
import { BeerType } from '../types/beer.type';
import { SnackType } from '../types/snack.type';

export const createBeer = (data: BeerType) => {
  return repository.post(`/api/beer`, data);
};
export const createAccessory = (data: AccessoryType) => {
  return repository.post(`/api/accessory`, data);
};
export const createSnack = (data: SnackType) => {
  return repository.post(`/api/snack}`, data);
};
