import { auth } from "@middleware/auth";
import Typography from "@mui/material/Typography";

export default async function HomePage() {
  const session = await auth();

  return (
    <Typography>
      Welcome to Toolpad, {session?.user?.name || "User"}!
    </Typography>
  );
}
