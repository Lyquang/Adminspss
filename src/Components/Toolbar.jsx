import React from 'react';
import Box from '@mui/material/Box';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <Box sx={{ flexGrow: 1 }} />
      </GridToolbarContainer>
    );
  }

export default CustomToolbar;
  