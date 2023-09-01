import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import copy from 'clipboard-copy';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAdminPageProducts } from './api/get-page-products.api';
import CreateProductButtons from './components/create-product-button.component';

const PAGE_SIZE = 20;
const PARAM_PAGE = 'page';

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

const ProductsPage = () => {
  const colors = useTheme().palette;
  const { search: urlSearchString } = useLocation();
  const params = new URLSearchParams(urlSearchString);
  const page = Number(params.get(PARAM_PAGE)) || 1;
  const history = useNavigate();
  const classes = useStyles();

  const productQuery = useQuery(['page-product', page], async () => {
    const response = await getAdminPageProducts(page, PAGE_SIZE);
    return response.data;
  });

  const columns: GridColDef[] = [
    {
      field: 'id',
      flex: 2,
      headerName: 'ID',
      renderCell: params => {
        const [tooltipOpenMap, setTooltipOpenMap] = useState<{ [key: string]: boolean }>({});
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const [tooltipTitle, setTooltipTitle] = useState('Copy ID'); // Initialize with "Copy ID"

        const toggleTooltip = (itemId: string) => {
          setTooltipOpenMap(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId],
          }));
        };

        const handleCopyClick = (idToCopy: string) => {
          copy(idToCopy);

          setTooltipTitle('Copied!');

          setTimeout(() => {
            setTooltipTitle('Copy ID');
            setTooltipOpen(false);
          }, 5000);
        };

        return (
          <Box display="flex" maxWidth={'100%'}>
            <Tooltip
              title={tooltipTitle}
              open={tooltipOpenMap[params.row.id] || false}
              onClose={() => toggleTooltip(params.row.id)}
              onOpen={() => toggleTooltip(params.row.id)}
            >
              <Button variant="outlined" onClick={() => handleCopyClick(params.row.id)}>
                <div className={classes.productButtonContent}>{params.row.id}</div>
              </Button>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      cellClassName: 'name-column--cell',
      sortable: false,
      filterable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 5,
      cellClassName: 'description-column--cell',
      sortable: false,
      filterable: false,
    },
    {
      field: 'category',
      flex: 2,
      headerName: 'Category',
      cellClassName: 'category-column--cell',
      sortable: false,
      filterable: false,
    },
    {
      field: 'quantity',
      flex: 1,
      headerName: 'Quantity',
      cellClassName: 'quantity-column--cell',
      sortable: false,
      filterable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      cellClassName: 'price-column--cell',
      sortable: false,
      filterable: false,
    },
    {
      field: 'to product',
      headerName: '',
      flex: 2,
      sortable: false,
      filterable: false,
      renderCell: params => {
        const handleGoToClick = () => {
          const productId = params.row.id;
          const category = params.row.category;
          history(`/products/${category}/${productId}`);
        };

        const [tooltipOpenMap, setTooltipOpenMap] = useState<{ [key: string]: boolean }>({});

        const toggleTooltip = (itemId: string) => {
          setTooltipOpenMap(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId],
          }));
        };

        return (
          <Box m="0 auto">
            <Tooltip
              title={`Go to ${params.row.name}`}
              open={tooltipOpenMap[params.row.id] || false}
              onClose={() => toggleTooltip(params.row.id)}
              onOpen={() => toggleTooltip(params.row.id)}
            >
              <Button
                variant="outlined"
                className={classes.productButton}
                onClick={handleGoToClick}
              >
                <div className={classes.productButtonContent}>{params.row.name}</div>
              </Button>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {productQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : productQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Box
          m="40px 0 0 0"
          height="fit-content"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.text.primary,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.primary.contrastText,
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.background.paper,
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.primary.contrastText,
            },
            '& .MuiCheckbox-root': {
              color: `${colors.primary.dark}`,
            },
          }}
        >
          <CreateProductButtons />
          <DataGrid
            disableRowSelectionOnClick
            rows={productQuery.data?.items || []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20]}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;
