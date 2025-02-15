import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ce7c",
      dark: "#007d4e", 
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1e1e1e", // Slightly lighter background color
    },
    text: {
      primary: "#ffffff", // Text color
      secondary: "#a0a0a0", // Secondary text color
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00ce7c",
      light: "#007d4e",
    },
    background: {
      default: "#fff", // Dark background color
      paper: "#e1dada", // Slightly lighter background color
    },
    text: {
      primary: "#000000", // Text color
      secondary: "#111010", // Secondary text color
    },
  },
});

export { darkTheme, lightTheme };