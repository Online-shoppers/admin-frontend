import repository from '../../../api/repository';
import { AccessoryCreateType } from '../types/accessory-create.type';
import { AccessoryType } from '../types/accessory.type';
import { BeerCreateType } from '../types/beer-create.type';
import { BeerType } from '../types/beer.type';
import { SnackCreateType } from '../types/snack-create.type';
import { SnackType } from '../types/snack.type';

export const createBeer = (data: BeerCreateType) => {
  return repository.post(`/api/beer`, data);
};
export const createAccessory = (data: AccessoryCreateType) => {
  return repository.post(`/api/accessory`, data);
};
export const createSnack = (data: SnackCreateType) => {
  return repository.post(`/api/snacks`, data);
};
