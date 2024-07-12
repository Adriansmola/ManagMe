import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

interface LogoutProps {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout = ({ setLogged }: LogoutProps) => {
  return (
    <Button
      onClick={() => setLogged((prev) => !prev)}
      startIcon={<LogoutIcon sx={{ color: "text.primary"}}/>}
      sx={{
        color: "text.primary",
        bgcolor: "transparent",
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
