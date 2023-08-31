import repository from 'api/repository';

import { Product } from '../types/product.type';

interface PageAdminProductsResponse {
  info: {
    total: number;
  };

  items: Product[];
}

export const getAdminPageProducts = (page: number, size: number) => {
  return repository.get<PageAdminProductsResponse>('/api/products', {
    params: { page, size, includeArchived: true },
  });
};
