import repository from '../../../api/repository';
import { AccessoryCreateType } from '../types/accessory-create.type';
import { BeerCreateType } from '../types/beer-create.type';
import { SnackCreateType } from '../types/snack-create.type';

export const createBeer = (data: BeerCreateType) => {
  return repository.post(`/api/beer`, data);
};
export const createAccessory = (data: AccessoryCreateType) => {
  return repository.post(`/api/accessory`, data);
};
export const createSnack = (data: SnackCreateType) => {
  return repository.post(`/api/snacks`, data);
};
