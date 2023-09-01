import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertTitle, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { getAccessoryInfo, updateAccessoryInfo } from './api/get-products.api';
import { AccessoryType } from './types/accessory.type';

export const Accessory = () => {
  const { productId } = useParams();
  const { t } = useTranslation('product');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
      const response = await getAccessoryInfo(productId);
      return response.data;
    },
  });

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    price: yup.number().min(1, 'Price must be a positive number').required('Price is required'),
    description: yup.string().required('Description is required'),
    quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    weight: yup
      .number()
      .min(0.1, 'Weight must be a positive number')
      .required('Weight is required'),
    image_url: yup.string().url('Invalid image URL').required('Image URL is required'),
    archived: yup.boolean().required('Archived is required'),
  });

  const { control, handleSubmit, formState } = useForm<AccessoryType>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const onSubmit = async (data: AccessoryType) => {
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccess(false);
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    data.weight = Number(data.weight);

    try {
      const response = await updateAccessoryInfo(productId, data);
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
      {accessoryQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : accessoryQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box display="flex" justifyContent="center">
          <Box width="80%" p={3} boxShadow={3} display="flex">
            <Box
              component="img"
              sx={{ height: 400, width: 400, marginRight: 7, marginTop: 3, objectFit: 'contain' }}
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
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t('Name')}
                        error={fieldState.invalid}
                        helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                        helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                        helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                        helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                        helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                        helperText={fieldState.invalid ? fieldState.error?.message : ''}
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

                  {formState.isSubmitSuccessful && (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {t('Success-changing')}
                      </Alert>
                    </Snackbar>
                  )}

                  {formState.isSubmitSuccessful === false && (
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {t('Error-changing')}
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
