import { Alert, AlertTitle, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { getProductInfo, updateBeerInfo } from './api/get-products.api';
import { BeerType } from './types/beer.type';

export const Beer = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation('product');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const category = 'beer';
  if (!productId) {
    return (
      <div>
        <h1>Product information is not available.</h1>
      </div>
    );
  }

  const beerQuery = useQuery<BeerType>({
    queryKey: ['product', category, productId],
    queryFn: async () => {
      const response = await getProductInfo(category, productId);
      return response.data as BeerType;
    },
  });

  const { control, handleSubmit } = useForm<BeerType>();
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: BeerType) => {
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccess(false);
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    data.volume = Number(data.volume);
    data.abv = Number(data.abv);
    data.ibu = Number(data.ibu);

    try {
      const response = await updateBeerInfo(productId, data);
      setSaveSuccess(true);
      setIsSaving(false);
    } catch (error) {
      setSaveError(true);
      setIsSaving(false);
    }
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box p={3}>
      {beerQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : beerQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box display="flex" justifyContent="center">
          <Box width="80%" p={3} boxShadow={3} display="flex">
            <Box
              component="img"
              sx={{ height: 400, width: 400, marginRight: 7, marginTop: 3, objectFit: 'contain' }}
              src={beerQuery.data.image_url}
              alt={beerQuery.data.name}
            />
            <Box flex="1" ml={2} display="flex" flexDirection="column">
              <Typography variant="h4" sx={{ paddingBottom: 3 }}>
                {beerQuery.data.name}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={beerQuery.data.name}
                    render={({ field }) => <TextField {...field} label={t('Name')} />}
                  />
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={beerQuery.data.price}
                    render={({ field }) => (
                      <TextField {...field} label={t('Price')} type="number" />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={beerQuery.data.description}
                    render={({ field }) => <TextField {...field} label={t('Description')} />}
                  />
                  <Controller
                    name="quantity"
                    control={control}
                    defaultValue={beerQuery.data.quantity}
                    render={({ field }) => (
                      <TextField {...field} type="number" label={t('Quantity')} />
                    )}
                  />
                  <Controller
                    name="abv"
                    control={control}
                    defaultValue={beerQuery.data.abv}
                    render={({ field }) => <TextField {...field} type="number" label={t('Abv')} />}
                  />
                  <Controller
                    name="country"
                    control={control}
                    defaultValue={beerQuery.data.country}
                    render={({ field }) => (
                      <TextField {...field} type="string" label={t('country')} />
                    )}
                  />

                  <Controller
                    name="volume"
                    control={control}
                    defaultValue={beerQuery.data.volume}
                    render={({ field }) => (
                      <TextField {...field} type="number" label={t('Volume')} />
                    )}
                  />
                  <Controller
                    name="ibu"
                    control={control}
                    defaultValue={beerQuery.data.ibu}
                    render={({ field }) => <TextField {...field} type="number" label={t('Ibu')} />}
                  />
                  <Controller
                    name="image_url"
                    control={control}
                    defaultValue={beerQuery.data.image_url}
                    render={({ field }) => <TextField {...field} label={t('Image')} />}
                  />
                  <Controller
                    name="archived"
                    control={control}
                    defaultValue={beerQuery.data.archived}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox checked={field.value} {...field} />}
                        label={t('Archived')}
                      />
                    )}
                  />
                  <Button type="submit" variant="contained">
                    {t('Save-changing')}
                  </Button>

                  {saveError && (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {t('Error-changing')}
                      </Alert>
                    </Snackbar>
                  )}
                  {saveSuccess && (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {t('Success-changing')}
                      </Alert>
                    </Snackbar>
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
