import { Box, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { SHORT_DATE_FORMAT } from 'dates/formats';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAdminPageProducts } from './api/get-page-products.api';
import CreateProductButtons from './components/create-product-button.component';
import { Product } from './types/product.type';

const PAGE_SIZE = 20;
const PARAM_PAGE = 'page';
const useStyles = makeStyles(() => ({
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  row: {
    cursor: 'pointer',
  },

  tooltipPopper: {
    fontSize: '2rem',
  },

  pagination: {
    '& > .MuiPagination-ul': {
      justifyContent: 'center',
      margin: '5px',
    },
  },

  customFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const ProductsPage = () => {
  const { t } = useTranslation('product');

  const colors = useTheme().palette;

  const { search: urlSearchString, pathname } = useLocation();
  const params = new URLSearchParams(urlSearchString);
  const page = Number(params.get(PARAM_PAGE)) || 1;

  const navigate = useNavigate();

  const classes = useStyles();

  const productQuery = useQuery(['page-product', page], async () => {
    const response = await getAdminPageProducts(page, PAGE_SIZE);
    return response.data;
  });

  const totalPages = Math.ceil((productQuery.data?.info.total || 0) / PAGE_SIZE);

  const onChangePage = useCallback(
    (newPage: number) => {
      const newParams = new URLSearchParams(urlSearchString);
      newParams.set(PARAM_PAGE, newPage.toString());

      navigate(`${pathname}?${newParams.toString()}`);
    },
    [pathname, urlSearchString],
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: params => {
        return (
          <Tooltip title={params.id} classes={{ popper: classes.tooltipPopper }}>
            <div className={classes.ellipsis}>{params.row.id}</div>
          </Tooltip>
        );
      },
    },

    {
      field: 'created',
      headerName: t('product:columns.Created'),
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: (params: GridRenderCellParams<Product>) => {
        return dayjs(params.row.created).format(SHORT_DATE_FORMAT);
      },
    },

    {
      field: 'updated',
      headerName: t('product:columns.Updated'),
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: (params: GridRenderCellParams<Product>) => {
        return dayjs(params.row.created).format(SHORT_DATE_FORMAT);
      },
    },

    {
      field: 'category',
      headerName: t('product:columns.Category'),
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params: GridRenderCellParams<Product>) => {
        return t(`product:categories.${params.row.category}`);
      },
    },

    {
      field: 'name',
      headerName: t('product:columns.Name'),
      flex: 1,
      sortable: false,
      filterable: false,
      minWidth: 200,
    },

    {
      field: 'quantity',
      width: 100,
      headerName: t('product:columns.Quantity'),
      sortable: false,
      filterable: false,
    },

    {
      field: 'price',
      headerName: t('product:columns.Price'),
      width: 70,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box>
      {productQuery.isLoading ? (
        <Typography>Loading...</Typography>
      ) : productQuery.isError ? (
        <Typography>Error loading data</Typography>
      ) : (
        <Stack
          direction="column"
          gap="1rem"
          height="fit-content"
          sx={{
            width: '100%',
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
            disableColumnSelector
            disableColumnMenu
            classes={{ row: classes.row }}
            onRowClick={(params: GridRowParams<Product>) =>
              navigate(`./${params.row.category}/${params.row.id}`)
            }
            rows={productQuery.data?.items || []}
            localeText={{
              toolbarDensity: 'Size',
              toolbarDensityLabel: 'Size',
            }}
            columns={columns}
            slots={{
              // Custom footer of DataGrid
              footer: () => (
                <Box className={classes.customFooter}>
                  <Typography>{t(`product:Page-n-of`, { n: page, total: totalPages })}</Typography>
                  <Box>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, value) => onChangePage(value)}
                      translate="yes"
                      color="primary"
                      className={classes.pagination}
                    />
                  </Box>
                </Box>
              ),
            }}
          />
        </Stack>
      )}
    </Box>
  );
};

export default ProductsPage;
