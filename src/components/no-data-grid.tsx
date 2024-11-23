import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import NoDataLogo from '@assets/svg/no-data.svg';

const NoDataGrid = () => {
  return (
    <Stack sx={{ height: '100%', padding: 2, alignItems: 'center' }} spacing={2}>
      <Image src={NoDataLogo} alt="No data" style={{ height: '80%' }} />
      <Typography textAlign={'center'} variant="subdued">
        No data !
      </Typography>
    </Stack>
  );
};

export default NoDataGrid;
