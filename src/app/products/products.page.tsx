/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAdminPageProducts } from './api/get-page-products.api';

const PAGE_SIZE = 20;
const PARAM_PAGE = 'page';

const ProductsPage = () => {
  const theme = useTheme();
  const colors = useTheme().palette;
  const { search: urlSearchString, pathname } = useLocation();
  const params = new URLSearchParams(urlSearchString);
  const page = Number(params.get(PARAM_PAGE)) || 1;
  const history = useNavigate();

  const productQuery = useQuery(['page-product', page], async () => {
    const response = await getAdminPageProducts(page, PAGE_SIZE);
    return response.data;
  });

  const columns = [
    { field: 'id', flex: 1, headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 2, cellClassName: 'name-column--cell' },
    {
      field: 'description',
      headerName: 'Description',
      flex: 4,
      cellClassName: 'description-column--cell',
    },
    { field: 'category', flex: 3, headerName: 'Category', type: 'number' },
    { field: 'quantity', flex: 3, headerName: 'quantity', type: 'number' },
    { field: 'price', headerName: 'Price', flex: 4, type: 'number' },
    { field: 'accessLevel', headerName: 'Access Level', flex: 1 },
    {
      field: 'to product',
      headerName: 'To Product',
      flex: 1,
      renderCell: (params: any) => {
        const handleEditClick = () => {
          const productId = params.row.id;
          const category = params.row.category;
          history(`/products/${category}/${productId}`);
        };

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button
              title="Edit"
              style={{ backgroundColor: '#f9a825', color: 'white' }}
              onClick={handleEditClick}
            >
              {params.row.name}
            </Button>
          </Box>
        ); // demo styles
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
          height="75vh"
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
              color: `${colors.primary.dark} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={productQuery.data?.items || []} columns={columns} />
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;
