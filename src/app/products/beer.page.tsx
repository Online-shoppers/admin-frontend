import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { getBeerInfo, updateBeerInfo } from './api/get-products.api';
import { ProductCategories } from './enums/product-categories.enum';
import { updateBeerSchema } from './schemas/update-beer.schema';
import { BeerType } from './types/beer.type';
import { UpdateBeerFormType } from './types/update-beer-form.type';

export const Beer = () => {
  const { productId } = useParams();

  const { t } = useTranslation('product');

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const category = ProductCategories.BEER;

  const beerQuery = useQuery<BeerType>({
    queryKey: ['product', category, productId],
    queryFn: async () => {
      const response = await getBeerInfo(productId);
      return response.data;
    },
  });

  const { control, handleSubmit } = useForm<UpdateBeerFormType>({
    resolver: yupResolver(updateBeerSchema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = handleSubmit(async (data: UpdateBeerFormType) => {
    setIsError(false);
    setSaveSuccess(false);

    try {
      await updateBeerInfo(productId as string, data);
      setSaveSuccess(true);
      beerQuery.refetch();
    } catch (error) {
      console.error(error);

      const messages = getErrorMessages(error);
      const text = messages ? messages[0] : t('errors:Something-went-wrong');
      setIsError(true);
      setErrorMessage(text);
    }
    setOpen(true);
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (!productId) {
    return <Navigate to="/products" />;
  }

  return (
    <Box p={3}>
      {beerQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : beerQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box display="flex" justifyContent="center" width="100%">
          <Stack direction="row" width="100%" gap="1.5rem">
            <Box flex={3}>
              <img src={beerQuery.data.image_url} alt={beerQuery.data.name} width="100%" />
            </Box>

            <Stack component="form" flex={7} direction="column" gap="1rem" onSubmit={onSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={beerQuery.data.name}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} label={t('Name')} />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  defaultValue={beerQuery.data.price}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} label={t('Price')} type="number" />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={beerQuery.data.description}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} label={t('Description')} />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue={beerQuery.data.quantity}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} type="number" error={!!error} label={t('Quantity')} />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="abv"
                  control={control}
                  defaultValue={beerQuery.data.abv}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField
                        {...field}
                        error={!!error}
                        type="number"
                        label={t('Alcohol-by-volume')}
                      />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="country"
                  control={control}
                  defaultValue={beerQuery.data.country}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} type="string" label={t('Country')} />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />

                <Controller
                  name="volume"
                  control={control}
                  defaultValue={beerQuery.data.volume}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} type="number" label={t('Volume')} />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="ibu"
                  control={control}
                  defaultValue={beerQuery.data.ibu}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} type="number" label={t('Bittering')} />
                      {error && <FormLabel error>{t(error?.message)}</FormLabel>}
                    </FormControl>
                  )}
                />
                <Controller
                  name="image_url"
                  control={control}
                  defaultValue={beerQuery.data.image_url}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl>
                      <TextField {...field} error={!!error} label={t('Image')} />
                      {error && <FormLabel error>{t(error.message)}</FormLabel>}
                    </FormControl>
                  )}
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

                {isError && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <Alert onClose={handleClose} severity="error" variant="filled">
                      {errorMessage}
                    </Alert>
                  </Snackbar>
                )}
                {saveSuccess && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <Alert onClose={handleClose} severity="success" variant="filled">
                      {t('Success-changing')}
                    </Alert>
                  </Snackbar>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
