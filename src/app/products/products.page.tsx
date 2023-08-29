import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

import { mockDataTeam } from '../../mock/mockProducts';

const ProductsPage = () => {
  const theme = useTheme();
  const colors = useTheme().palette;
  console.log(colors);
  const columns = [
    { field: 'id', flex: 1, headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 2, cellClassName: 'name-column--cell' },
    { field: 'category', flex: 3, headerName: 'Category', type: 'number' },
    { field: 'price', headerName: 'Price', flex: 4, type: 'number' },
    {
      field: 'accessLevel',
      headerName: 'Access Level',
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button title="Edit"></Button>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};
export default ProductsPage;
