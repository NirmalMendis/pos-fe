import Typography from '@mui/material/Typography';
import { auth } from '@middleware/auth';

export default async function HomePage() {
  const session = await auth();

  return <Typography>Welcome to Toolpad, {session?.user?.name || 'User'}!</Typography>;
}
