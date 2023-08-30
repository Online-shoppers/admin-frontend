import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
    <Box p={3}>
      {accessoryQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : accessoryQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box display="flex" justifyContent="center">
          <Box width="80%" p={3} boxShadow={3} display="flex">
            <Box
              component="img"
              sx={{ height: 400, width: 400, marginRight: 7, marginTop: 3 }}
              src={accessoryQuery.data.image_url}
              alt={accessoryQuery.data.name}
            />
            <Box flex="1" ml={2} display="flex" flexDirection="column">
              <Typography variant="h4" sx={{ paddingBottom: 3 }}>
                {accessoryQuery.data.name}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2}>
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
                    render={({ field }) => <TextField {...field} label="Price" type="number" />}
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
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
