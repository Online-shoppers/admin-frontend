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

import { createAccessory } from './api/post-page-products.api';
import { AccessoryTypes } from './enums/accessory-types.enum';
import { AccessoryType } from './types/accessory.type';

export const AccessoryCreate = () => {
  const { t } = useTranslation('product');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { control, handleSubmit } = useForm<AccessoryType>();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: AccessoryType) => {
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
            Create Accessory
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField {...field} label={t('Name')} />}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={t('Price')} type="number" inputProps={{ min: 0 }} />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel>{t('Type')}</InputLabel>
                    <Select {...field} label={t('Type')} inputProps={{ min: 0 }}>
                      {Object.values(AccessoryTypes).map(AccessoryTypes => (
                        <MenuItem key={AccessoryTypes} value={AccessoryTypes}>
                          {AccessoryTypes}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => <TextField {...field} label={t('Description')} />}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Quantity')}
                    inputProps={{ min: 0 }}
                  />
                )}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label={t('Weight')} inputProps={{ min: 0 }} />
                )}
              />
              <Controller
                name="image_url"
                control={control}
                render={({ field }) => <TextField {...field} label={t('Image')} />}
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
