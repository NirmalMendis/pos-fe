import { Grid2 as Grid, TextField } from '@mui/material';
import { FC } from 'react';
import { useCustomHookForm } from '@utils/helpers/use-custom-form';
import { AddEditItemFormProps, AddEditItemSchemaType } from './items.types';
import addEditItemSchema from './schema/add-edit-item-schema';

const AddEditItemForm: FC<AddEditItemFormProps> = ({ onSubmit, item, formId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useCustomHookForm<AddEditItemSchemaType>(addEditItemSchema, {
    defaultValues: {
      ...item,
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} noValidate id={formId}>
      <Grid container rowSpacing={3} columnSpacing={2} sx={{ paddingY: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Name" {...register('name')} error={!!errors.name?.message} helperText={errors.name?.message} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Description" {...register('description')} error={!!errors.description?.message} helperText={errors.description?.message} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField label="Barcode" {...register('barcode')} error={!!errors.barcode?.message} helperText={errors.barcode?.message} />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEditItemForm;
