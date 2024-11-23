import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { AddEditEntityDialogProps } from './crud-layout.types';

const AddEditEntityDialog: FC<AddEditEntityDialogProps> = ({ handleClose, openCreateEntityModal, form, entityTitle, formId }) => {
  return (
    <Dialog open={openCreateEntityModal} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle>{`Create ${entityTitle}`}</DialogTitle>
      {/* {isPendingMutation && <LinearProgress />} */}
      <DialogContent dividers>{form}</DialogContent>
      <DialogActions sx={{ paddingY: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form={formId}>{`Create ${entityTitle}`}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditEntityDialog;
