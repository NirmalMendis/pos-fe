import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { AddEditEntityDialogProps } from './crud-layout.types';

const AddEditEntityDialog: FC<AddEditEntityDialogProps> = ({ handleClose, openAddEditEntityModal, form, entityTitle, formId, actionTitle }) => {
  const actionPhrase = `${actionTitle} ${entityTitle}`;

  return (
    <Dialog open={openAddEditEntityModal} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle>{actionPhrase}</DialogTitle>
      {/* {isPendingMutation && <LinearProgress />} */}
      <DialogContent dividers>{form}</DialogContent>
      <DialogActions sx={{ paddingY: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form={formId}>
          {actionPhrase}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditEntityDialog;
