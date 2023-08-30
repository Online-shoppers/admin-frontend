import { CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@tanstack/react-query/build/lib/__tests__/utils';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { getProductInfo, updateAccessoryInfo } from './api/get-products.api';
import { AccessoryType } from './types/accessory.type';

export const Accessory = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const category = 'accessories';
  if (!productId) {
    return (
      <div>
        <h1>Product information is not available.</h1>
      </div>
    );
  }

  const accessoryQuery = useQuery<AccessoryType>({
    queryKey: ['product', category, productId],
    queryFn: async () => {
      const response = await getProductInfo(category, productId);
      return response.data as AccessoryType;
    },
  });

  const { control, handleSubmit } = useForm<AccessoryType>();

  const onSubmit = async (data: AccessoryType) => {
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    data.weight = Number(data.weight);
    const response = await updateAccessoryInfo(productId, data);
    console.log(response);
  };

  return (
    <Box>
      {accessoryQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : accessoryQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <div>
          <Typography variant="h4">{category}</Typography>
          {accessoryQuery && (
            <Box>
              <CardMedia
                component="img"
                height="140"
                image={accessoryQuery.data.image_url} // Assuming product has an 'image_url' property
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={accessoryQuery.data.name}
                  render={({ field }) => <TextField {...field} label="Name" />}
                />
                <Controller
                  name="price"
                  control={control}
                  defaultValue={accessoryQuery.data.price}
                  render={({ field }) => <TextField {...field} label="Price" />}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={accessoryQuery.data.description}
                  render={({ field }) => <TextField {...field} label="Description" />}
                />
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue={accessoryQuery.data.quantity}
                  render={({ field }) => <TextField {...field} type="number" label="Quantity" />}
                />
                <Controller
                  name="weight"
                  control={control}
                  defaultValue={accessoryQuery.data.weight}
                  render={({ field }) => <TextField {...field} label="Weight" />}
                />
                <Controller
                  name="image_url"
                  control={control}
                  defaultValue={accessoryQuery.data.image_url}
                  render={({ field }) => <TextField {...field} label="Image URL" />}
                />
                <Controller
                  name="archived"
                  control={control}
                  defaultValue={accessoryQuery.data.archived}
                  render={({ field }) => <TextField {...field} label="Archived" />}
                />

                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </form>
            </Box>
          )}
        </div>
      )}
    </Box>
  );
};
