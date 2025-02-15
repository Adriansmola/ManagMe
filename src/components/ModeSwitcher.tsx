import { Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useMode } from "../context/ModeProvider.tsx";

function ModeSwitcher() {
  const { mode, toggleMode } = useMode();
  return (
    <Button
      onClick={toggleMode}
      startIcon={mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      sx={{
        color: "text.primary",
        bgcolor: "transparent",
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {mode === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}

export default ModeSwitcher;