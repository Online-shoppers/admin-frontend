import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  parent: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  form: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SignIn = () => {
  const { t } = useTranslation('auth');

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.parent}>
      <Box className={classes.form} gap={3}>
        <Typography component="h1" variant="h5">
          {t('Sign-in')}
        </Typography>
        <Box component="form">
          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label={t('Email')}
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label={t('Password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Box>
        <Box display="flex" flexDirection="column" width="100%" gap={1}>
          <Button type="submit" fullWidth variant="contained">
            {t('Do-sign-in')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
