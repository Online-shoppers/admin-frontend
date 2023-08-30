import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { getProductInfo } from './api/get-products.api';
import { BeerType } from './types/beer.type';
import { SnackType } from './types/snack.type';

export const Beer = () => {
  const { productId } = useParams();
  const category = 'beer';
  const queryClient = useQueryClient();

  if (!productId) {
    return (
      <div>
        <h1>Product information is not available.</h1>
      </div>
    );
  }

  queryClient.prefetchQuery(['product', category, productId], async () => {
    const response = await getProductInfo(category, productId);
    return response.data as BeerType;
  });

  const productQuery = useQuery(['product', 'snacks', productId]);
  console.log(productQuery.data);
  return (
    <div>
      <h1>Beer</h1>
    </div>
  );
};
