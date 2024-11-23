import { UseFormReset } from 'react-hook-form';
import { InferType } from 'yup';
import addEditItemSchema from './schema/add-edit-item-schema';

export type AddEditItemSchemaType = typeof addEditItemSchema;
export type CRUItemFormValues = InferType<AddEditItemSchemaType>;

export interface AddEditItemFormProps {
  onSubmit: (data: CRUItemFormValues, reset: UseFormReset<CRUItemFormValues>) => void;
  item?: CRUItemFormValues;
  formId: string;
}
