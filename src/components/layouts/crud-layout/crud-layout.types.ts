import { DataGridProps } from '@mui/x-data-grid';

export interface CrudLayoutProps {
  entityTitle: string;
  addEntity: { formId: string; form: React.ReactNode };
  openCreateEntityModal: boolean;
  handleOpenCloseCreateEntityModal: () => void;
  dataGrid: DataGridProps;
}

export interface AddEditEntityDialogProps {
  entityTitle: CrudLayoutProps['entityTitle'];
  openCreateEntityModal: boolean;
  handleClose: () => void;
  form: React.ReactNode;
  formId: string;
}
