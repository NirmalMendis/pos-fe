import * as yup from 'yup';

const addEditItemSchema = yup.object({
  name: yup.string().required('Please enter the item name'),
  description: yup.string(),
  barcode: yup.string(),
});

export default addEditItemSchema;
