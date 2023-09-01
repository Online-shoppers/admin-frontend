import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { createBeer } from './api/post-page-products.api';
import { BeerTypes } from './enums/beer-types.enum';
import { createBeerSchema } from './schemas/create-beer.schema';
import { BeerCreateType } from './types/beer-create.type';

export const BeerCreate = () => {
  const { t } = useTranslation('product');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { control, handleSubmit, formState } = useForm<BeerCreateType>({
    resolver: yupResolver(createBeerSchema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: BeerCreateType) => {
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccess(false);

    try {
      const response = await createBeer(data);
      setSaveSuccess(true);
      setIsSaving(false);
      window.location.reload();
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
    <Box display="flex" justifyContent="center">
      <Box width="80%" p={3} boxShadow={3} display="flex">
        <Box flex="1" ml={2} display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ paddingBottom: 3 }}>
            {t('Create-beer')}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Controller
                name="name"
                control={control}
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
                name="type"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl error={fieldState.invalid}>
                    <InputLabel>{t('Type')}</InputLabel>
                    <Select {...field} label={t('Type')} inputProps={{ min: 0 }}>
                      {Object.values(BeerTypes).map(type => (
                        <MenuItem key={type} value={type}>
                          {t(`beer.${type}`)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="description"
                control={control}
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
                name="abv"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Alcohol-by-volume')}
                    inputProps={{ min: 0 }}
                    error={fieldState.invalid}
                    helperText={fieldState.error ? t(fieldState.error.message) : ''}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    label={t('Country')}
                    error={fieldState.invalid}
                    helperText={fieldState.error ? t(fieldState.error.message) : ''}
                  />
                )}
              />
              <Controller
                name="volume"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Volume')}
                    inputProps={{ min: 0 }}
                    error={fieldState.invalid}
                    helperText={fieldState.error ? t(fieldState.error.message) : ''}
                  />
                )}
              />
              <Controller
                name="ibu"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('International-bittering-value')}
                    inputProps={{ min: 0 }}
                    error={fieldState.invalid}
                    helperText={fieldState.error ? t(fieldState.error.message) : ''}
                  />
                )}
              />
              <Controller
                name="image_url"
                control={control}
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
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={t('Archived')}
                  />
                )}
              />
              <Button type="submit" variant="contained" disabled={formState.isSubmitting}>
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
  );
};
