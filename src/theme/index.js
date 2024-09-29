import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          900: "#141414",
        },
        primary: {
          100: "#d5d5d5",
          900: "#040509",
        },
        redAccent: "#ff4d4d",
        greenAccent: "#4cceac",

        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#3A3D79",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          900: "#d5d5d5",
        },
        redAccent: "#db4f4a",
        greenAccent: "#4cceac",
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#eaeaf9",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[900],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#0b0c1b",
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#f7f7ff",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontSize: 30,
      },
      h2: {
        fontSize: 25,
        color: colors.blueAccent[400],
        fontWeight: "bolder",
      },
      h3: {
        fontSize: 20,
      },
      h4: {
        fontSize: 17,
        color: colors.blueAccent[800],
        fontWeight: "lighter",
      },
      h5: {
        fontSize: 15,
        color: colors.blueAccent[300],
      },
      h6: {
        fontSize: 12,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
