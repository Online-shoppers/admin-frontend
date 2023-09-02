import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ProductCategories } from '../enums/product-categories.enum';

const CreateProductButtons = () => {
  const { t } = useTranslation('product');

  const history = useNavigate();

  const handleGoToClick = (category: ProductCategories) => {
    history(`/products/${category}/create`);
  };

  const renderButtons = () => {
    return (
      <Stack direction="row" gap="1rem">
        {Object.values(ProductCategories).map(category => (
          <Button key={category} variant="outlined" onClick={() => handleGoToClick(category)}>
            {t(`product:Add-${category}`)}
          </Button>
        ))}
      </Stack>
    );
  };

  return <div>{renderButtons()}</div>;
};

export default CreateProductButtons;
