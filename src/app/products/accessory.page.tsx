import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Checkbox, FormControlLabel, Snackbar, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { DefaultError } from 'errors/default.error';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { getAccessoryInfo, updateAccessoryInfo } from './api/get-products.api';
import { ProductCategories } from './enums/product-categories.enum';
import { updateAccessorySchema } from './schemas/update-accessory.schema';
import { AccessoryType } from './types/accessory.type';
import { UpdateAccessoryFormType } from './types/update-accessory-form.type';

export const Accessory = () => {
  const { productId } = useParams();

  const { t } = useTranslation('product');

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const category = ProductCategories.ACCESSORIES;

  const accessoryQuery = useQuery<AccessoryType>({
    queryKey: ['product', category, productId],
    queryFn: async () => {
      const response = await getAccessoryInfo(productId);
      return response.data;
    },
  });

  const { control, handleSubmit } = useForm<UpdateAccessoryFormType>({
    resolver: yupResolver(updateAccessorySchema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = handleSubmit(async data => {
    setSaveSuccess(false);

    try {
      await updateAccessoryInfo(productId as string, data);
      setSaveSuccess(true);
      accessoryQuery.refetch();
    } catch (error) {
      setIsError(true);
      if (isAxiosError<DefaultError>(error)) {
        setErrorMessage(error.response?.data.message || t('errors:Something-went-wrong'));
      } else {
        setErrorMessage(t('errors:Something-went-wrong'));
      }
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
      {accessoryQuery.isLoading ? (
        <Typography>{t('Loading')}</Typography>
      ) : accessoryQuery.isError ? (
        <Typography>{t('Error-loading')}</Typography>
      ) : (
        <Box display="flex" justifyContent="center">
          <Stack direction="row" width="100%" gap="1.5rem">
            <Box flex={3}>
              <img
                src={accessoryQuery.data.image_url}
                alt={accessoryQuery.data.name}
                width="100%"
              />
            </Box>
            <Stack
              component="form"
              flex={7}
              display="flex"
              flexDirection="column"
              onSubmit={onSubmit}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={accessoryQuery.data.name}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={t('Name')}
                      error={fieldState.invalid}
                      helperText={fieldState.error ? t(fieldState.error.message) : ''}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  defaultValue={accessoryQuery.data.price}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={t('Price')}
                      type="number"
                      inputProps={{ min: 0 }}
                      error={fieldState.invalid}
                      helperText={fieldState.error ? t(fieldState.error.message) : ''}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={accessoryQuery.data.description}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={t('Description')}
                      error={fieldState.invalid}
                      helperText={fieldState.error ? t(fieldState.error.message) : ''}
                    />
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue={accessoryQuery.data.quantity}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      label={t('Quantity')}
                      inputProps={{ min: 0 }}
                      error={fieldState.invalid}
                      helperText={fieldState.error ? t(fieldState.error.message) : ''}
                    />
                  )}
                />
                <Controller
                  name="weight"
                  control={control}
                  defaultValue={accessoryQuery.data.weight}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      label={t('Weight')}
                      inputProps={{ min: 0 }}
                      error={fieldState.invalid}
                      helperText={fieldState.error ? t(fieldState.error.message) : ''}
                    />
                  )}
                />
                <Controller
                  name="image_url"
                  control={control}
                  defaultValue={accessoryQuery.data.image_url}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={t('Image')}
                      error={fieldState.invalid}
                      helperText={fieldState.error ? t(fieldState.error.message) : ''}
                    />
                  )}
                />
                <Controller
                  name="archived"
                  control={control}
                  defaultValue={accessoryQuery.data.archived}
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
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
