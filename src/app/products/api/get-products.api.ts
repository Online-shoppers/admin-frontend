import repository from '../../../api/repository';
import { AccessoryType } from '../types/accessory.type';
import { BeerType } from '../types/beer.type';
import { SnackType } from '../types/snack.type';
import { UpdateBeerFormType } from '../types/update-beer-form.type';

export const getBeerInfo = (id?: string) => {
  return repository.get<BeerType>(`/api/beer/${id}`, {
    params: { id },
  });
};

export const getSnackInfo = (id?: string) => {
  return repository.get<SnackType>(`/api/snacks/${id}`, {
    params: { id },
  });
};

export const getAccessoryInfo = (id?: string) => {
  return repository.get<AccessoryType>(`/api/accessory/${id}`, {
    params: { id },
  });
};

export const updateAccessoryInfo = (id: string, data: AccessoryType) => {
  return repository.put<AccessoryType>(`/api/accessory/${id}`, data);
};

export const updateBeerInfo = (id: string, data: UpdateBeerFormType) => {
  return repository.put<BeerType>(`/api/beer/${id}`, data);
};

export const updateSnackInfo = (id: string, data: SnackType) => {
  return repository.put<SnackType>(`/api/snacks/${id}`, data);
};
