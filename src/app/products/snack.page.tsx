import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { DefaultError } from 'errors/default.error';
import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { getSnackInfo, updateSnackInfo } from './api/get-products.api';
import { ProductCategories } from './enums/product-categories.enum';
import { updateSnackSchema } from './schemas/update-snack.schema';
import { SnackType } from './types/snack.type';
import { UpdateSnackFormType } from './types/update-snack-form.type';

export const Snack = () => {
  const { productId } = useParams();

  const { t } = useTranslation('product');

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const category = ProductCategories.SNACKS;

  const snackQuery = useQuery<SnackType>({
    queryKey: ['product', category, productId],
    queryFn: async () => {
      const response = await getSnackInfo(productId);
      return response.data;
    },
  });

  const { control, handleSubmit } = useForm<UpdateSnackFormType>({
    resolver: yupResolver(updateSnackSchema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = handleSubmit(async (data: SnackType) => {
    setIsError(false);
    setSaveSuccess(false);

    try {
      await updateSnackInfo(productId as string, data);
      setSaveSuccess(true);
      snackQuery.refetch();
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
      {snackQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : snackQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box display="flex" justifyContent="center">
          <Box width="100%" display="flex" gap="1.5rem">
            <Box flex={3}>
              <img src={snackQuery.data.image_url} alt={snackQuery.data.name} width="100%" />
            </Box>
            <Box
              component="form"
              flex={7}
              ml={2}
              display="flex"
              flexDirection="column"
              onSubmit={onSubmit}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={snackQuery.data.name}
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
                  defaultValue={snackQuery.data.price}
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
                  defaultValue={snackQuery.data.description}
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
                  defaultValue={snackQuery.data.quantity}
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
                  defaultValue={snackQuery.data.weight}
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
                  defaultValue={snackQuery.data.image_url}
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
                  defaultValue={snackQuery.data.archived}
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
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
