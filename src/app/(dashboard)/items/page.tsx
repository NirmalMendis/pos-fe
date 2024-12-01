'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import useGetItemById from '@api/items/use-get-item-by-id';
import useGetItems from '@api/items/use-get-items';
import usePatchItemMutation from '@api/items/use-patch-item-mutation';
import usePostAddItem from '@api/items/use-post-add-item';
import CrudLayout from '@components/layouts/crud-layout/crud-layout';
import { ADD_ITEM_FORM_ID, EDIT_ITEM_FORM_ID } from '@utils/constants/form-constants';
import { DATAGRID_CONSTANTS } from '@utils/constants/generic-constants';
import AddEditItemForm from './add-edit-item-form';
import { AddEditItemFormProps } from './items.types';
import { useSnackbar } from 'notistack';
import useDeleteItem from '@api/items/use-delete-item';
import { useDialogs } from '@toolpad/core';

export default function ItemsPage() {
  const [openCreateItemModal, setOpenCreateItemModal] = useState(false);
  const [openEditItemModal, setOpenEditItemModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DATAGRID_CONSTANTS.DEFAULT_PAGE_SIZE,
    page: DATAGRID_CONSTANTS.DEFAULT_START_PAGE,
  });

  const { enqueueSnackbar } = useSnackbar();
  const dialogs = useDialogs();

  const addItemPostMutation = usePostAddItem();
  const patchItemMutation = usePatchItemMutation();
  const deleteItemMutation = useDeleteItem();
  const itemsGetQuery = useGetItems({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });
  const getItemByIdQuery = useGetItemById(
    {
      id: selectedItemId as string,
    },
    !!selectedItemId,
  );

  const handleOpenCloseCreateItemModal = () => {
    setOpenCreateItemModal((prev) => !prev);
  };
  const onAddItem: AddEditItemFormProps['onSubmit'] = (data, reset) => {
    addItemPostMutation.mutate({ payload: data });
    handleOpenCloseCreateItemModal();
    reset();
  };

  const handleOpenCloseEditItemModal = () => {
    setOpenEditItemModal((prev) => !prev);
  };

  const onEditItem: AddEditItemFormProps['onSubmit'] = (data, reset) => {
    patchItemMutation.mutate(
      {
        payload: {
          id: selectedItemId as string,
          ...data,
        },
      },
      {
        onSuccess: () => {
          handleOpenCloseEditItemModal();
          reset();
          enqueueSnackbar('Item updated', {
            variant: 'success',
          });
        },
      },
    );
  };

  const handleEditClick = (id: string) => () => {
    setSelectedItemId(id);
    handleOpenCloseEditItemModal();
  };
  const handleDeleteClick = (id: string) => async () => {
    const confirmed = await dialogs.confirm('Are you sure to delete this item?', {
      okText: 'Yes',
      cancelText: 'No',
    });
    if (confirmed) {
      deleteItemMutation.mutate(
        { id },
        {
          onSuccess: () => {
            enqueueSnackbar('Item deleted', {
              variant: 'success',
            });
          },
        },
      );
    }
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem key={'edit-btn'} icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(String(id))} color="inherit" />,
          <GridActionsCellItem key={'delete-btn'} icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(String(id))} color="inherit" />,
        ];
      },
    },
  ];

  return (
    <CrudLayout
      entityTitle="Item"
      addEntity={{
        form: <AddEditItemForm onSubmit={onAddItem} formId={ADD_ITEM_FORM_ID} />,
        formId: ADD_ITEM_FORM_ID,
      }}
      editEntity={
        getItemByIdQuery.data
          ? {
              form: <AddEditItemForm onSubmit={onEditItem} formId={EDIT_ITEM_FORM_ID} item={getItemByIdQuery.data} />,
              formId: EDIT_ITEM_FORM_ID,
            }
          : undefined
      }
      openCreateEntityModal={openCreateItemModal}
      handleOpenCloseCreateEntityModal={handleOpenCloseCreateItemModal}
      openEditEntityModal={openEditItemModal}
      handleOpenCloseEditEntityModal={handleOpenCloseEditItemModal}
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
