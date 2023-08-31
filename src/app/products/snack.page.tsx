import { Alert, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  getProductInfo,
  updateAccessoryInfo,
  updateBeerInfo,
  updateSnackInfo,
} from './api/get-products.api';
import { AccessoryType } from './types/accessory.type';
import { BeerType } from './types/beer.type';
import { SnackType } from './types/snack.type';

export const Snack = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation('product');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const category = 'snacks';
  if (!productId) {
    return (
      <div>
        <h1>Product information is not available.</h1>
      </div>
    );
  }

  const accessoryQuery = useQuery<SnackType>({
    queryKey: ['product', category, productId],
    queryFn: async () => {
      const response = await getProductInfo(category, productId);
      return response.data as AccessoryType;
    },
  });

  const { control, handleSubmit } = useForm<SnackType>();
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: SnackType) => {
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccess(false);
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    data.weight = Number(data.weight);

    try {
      const response = await updateSnackInfo(productId, data);
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
                    render={({ field }) => <TextField {...field} label={t('Name')} />}
                  />
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={accessoryQuery.data.price}
                    render={({ field }) => (
                      <TextField {...field} label={t('Price')} type="number" />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={accessoryQuery.data.description}
                    render={({ field }) => <TextField {...field} label={t('Description')} />}
                  />
                  <Controller
                    name="quantity"
                    control={control}
                    defaultValue={accessoryQuery.data.quantity}
                    render={({ field }) => (
                      <TextField {...field} type="number" label={t('Quantity')} />
                    )}
                  />
                  <Controller
                    name="weight"
                    control={control}
                    defaultValue={accessoryQuery.data.weight}
                    render={({ field }) => (
                      <TextField {...field} type="number" label={t('Weight')} />
                    )}
                  />
                  <Controller
                    name="image_url"
                    control={control}
                    defaultValue={accessoryQuery.data.image_url}
                    render={({ field }) => <TextField {...field} label={t('Image')} />}
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
