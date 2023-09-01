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
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { createAccessory } from './api/post-page-products.api';
import { AccessoryTypes } from './enums/accessory-types.enum';
import { AccessoryCreateType } from './types/accessory-create.type';
import { AccessoryType } from './types/accessory.type';

export const AccessoryCreate = () => {
  const { t } = useTranslation('product');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(t('Name-required')),
    price: yup.number().min(1, t('Price-min')).required(t('Price-required')),
    type: yup.string().required(t('Type-required')),
    description: yup.string().required(t('Description-required')),
    quantity: yup.number().min(1, t('Quantity-min')).required(t('Quantity-required')),
    weight: yup.number().min(0.1, t('Weight-min')).required(t('Weight-required')),
    image_url: yup.string().url(t('ImageURL-invalid')).required(t('ImageURL-required')),
    archived: yup.boolean().required(t('Archived-required')),
  });

  const { control, handleSubmit, formState } = useForm<AccessoryCreateType>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: AccessoryCreateType) => {
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccess(false);

    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    data.weight = Number(data.weight);

    try {
      const response = await createAccessory(data);
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
            {t('Create-accessory')}
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
                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                      {Object.values(AccessoryTypes).map(type => (
                        <MenuItem key={type} value={type}>
                          {type}
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
                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
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
                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
                  />
                )}
              />
              <Controller
                name="weight"
                control={control}
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
                defaultValue={false}
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
  );
};
