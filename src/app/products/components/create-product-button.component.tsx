import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { ProductCategories } from '../enums/product-categories.enum';

const useStyles = makeStyles(() => ({
  productButtonContent: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  productButton: {
    width: '150px',
    textTransform: 'none',
    margin: '5px',
  },
}));

const CreateProductButtons = () => {
  const classes = useStyles();
  const history = useNavigate();

  const handleGoToClick = (category: ProductCategories) => {
    history(`/products/${category}/create`);
  };

  const renderButtons = () => {
    return Object.values(ProductCategories).map(category => (
      <Button
        key={category}
        variant="outlined"
        className={classes.productButton}
        onClick={() => handleGoToClick(category)}
      >
        <div className={classes.productButtonContent}>{`Add ${category}`}</div>
      </Button>
    ));
  };

  return <div>{renderButtons()}</div>;
};

export default CreateProductButtons;
