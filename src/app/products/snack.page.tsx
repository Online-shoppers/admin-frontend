import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { getProductInfo } from './api/get-products.api';
import { SnackType } from './types/snack.type';

export const Snack = () => {
  const { productId } = useParams();
  const category = 'snacks';
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
    return response.data as SnackType;
  });

  const productQuery = useQuery(['product', 'snacks', productId]);
  console.log(productQuery.data);
  return (
    <div>
      <h1>Snack</h1>
    </div>
  );
};
