import { DataGridProps } from '@mui/x-data-grid';

export interface CrudLayoutProps {
  entityTitle: string;
  addEntity: { formId: string; form: React.ReactNode };
  editEntity?: { formId: string; form: React.ReactNode };
  openCreateEntityModal: boolean;
  handleOpenCloseCreateEntityModal: () => void;
  openEditEntityModal: boolean;
  handleOpenCloseEditEntityModal: () => void;
  dataGrid: DataGridProps;
}

export interface AddEditEntityDialogProps {
  entityTitle: CrudLayoutProps['entityTitle'];
  openAddEditEntityModal: boolean;
  handleClose: () => void;
  form: React.ReactNode;
  formId: string;
  actionTitle: string;
}
