import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { FC } from 'react';
import NoDataGrid from '@components/no-data-grid';
import { DATAGRID_CONSTANTS } from '@utils/constants/generic-constants';
import AddEditEntityDialog from './add-edit-entity-dialog';
import { CrudLayoutProps } from './crud-layout.types';

const CrudLayout: FC<CrudLayoutProps> = ({ entityTitle, addEntity, handleOpenCloseCreateEntityModal, openCreateEntityModal, dataGrid }) => {
  return (
    <Box>
      <Stack spacing={2}>
        <Box display={'flex'} justifyContent={'end'}>
          <Button startIcon={<AddCircleOutlineRoundedIcon />} onClick={handleOpenCloseCreateEntityModal}>{`Add ${entityTitle}`}</Button>
        </Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
          <DataGrid
            rows={dataGrid?.rows || []}
            rowCount={dataGrid?.rowCount || dataGrid?.rows?.length || 0}
            rowHeight={dataGrid?.rowHeight || DATAGRID_CONSTANTS.MUI_DATAGRID_DEFAULT_ROW_HEIGHT}
            pageSizeOptions={[DATAGRID_CONSTANTS.DEFAULT_PAGE_SIZE]}
            paginationMode="server"
            sx={{
              '--DataGrid-overlayHeight': '200px',
            }}
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: NoDataGrid,
            }}
            slotProps={{
              loadingOverlay: {
                variant: 'linear-progress',
                noRowsVariant: 'linear-progress',
              },
              baseButton: {
                variant: 'text',
              },
            }}
            {...dataGrid}
          />
        </Box>
      </Stack>
      <AddEditEntityDialog
        openCreateEntityModal={openCreateEntityModal}
        handleClose={handleOpenCloseCreateEntityModal}
        form={addEntity.form}
        formId={addEntity.formId}
        entityTitle={entityTitle}
      />
    </Box>
  );
};

export default CrudLayout;
