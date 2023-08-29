import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  indicator: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    translate: '-50% -50%',
  },
}));

// Potential feature: Add Backdrop?
const LoadingIndicator = () => {
  const classes = useStyles();

  return <CircularProgress size="3rem" className={classes.indicator} />;
};

export default LoadingIndicator;
