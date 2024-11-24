'use client';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import useGetItems from '@api/items/use-get-items';
import usePostAddItem from '@api/items/use-post-add-item';
import CrudLayout from '@components/layouts/crud-layout/crud-layout';
import { ADD_ITEM_FORM_ID } from '@utils/constants/form-constants';
import { DATAGRID_CONSTANTS } from '@utils/constants/generic-constants';
import AddEditItemForm from './add-edit-item-form';
import { AddEditItemFormProps } from './items.types';

export default function ItemsPage() {
  const [openCreateItemModal, setOpenCreateItemModal] = useState(false);

  const addItemPostMutation = usePostAddItem();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DATAGRID_CONSTANTS.DEFAULT_PAGE_SIZE,
    page: DATAGRID_CONSTANTS.DEFAULT_START_PAGE,
  });
  const itemsGetQuery = useGetItems({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const handleOpenCloseCreateItemModal = () => {
    setOpenCreateItemModal((prev) => !prev);
  };
  const onAddItem: AddEditItemFormProps['onSubmit'] = (data, reset) => {
    addItemPostMutation.mutate({ payload: data });
    handleOpenCloseCreateItemModal();
    reset();
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      flex: 1,
    },
    {
      field: 'barcode',
      headerName: 'Barcode',
      width: 150,
      flex: 1,
    },
  ];

  return (
    <CrudLayout
      entityTitle="Item"
      addEntity={{
        form: <AddEditItemForm onSubmit={onAddItem} formId={ADD_ITEM_FORM_ID} />,
        formId: ADD_ITEM_FORM_ID,
      }}
      openCreateEntityModal={openCreateItemModal}
      handleOpenCloseCreateEntityModal={handleOpenCloseCreateItemModal}
      dataGrid={{
        columns: columns,
        rows: itemsGetQuery.data?.data,
        rowCount: itemsGetQuery.data?.pager.totalItems,
        paginationModel: paginationModel,
        onPaginationModelChange: setPaginationModel,
        loading: itemsGetQuery.isFetching,
      }}
    />
  );
}
