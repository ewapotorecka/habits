import { createTheme, PaletteOptions } from "@mui/material/styles";

/**
 * @description Palette colors for MUI theme
 * @see https://mui.com/material-ui/customization/palette/
 */
const palette: PaletteOptions = {
  primary: {
    light: "#FFC2C4",
    main: "#FF595E",
    dark: "#FF474E",
  },
  secondary: {
    light: "#CEFF99",
    main: "#ABFF4F",
    dark: "#74E000",
  },

  common: {
    black: "#00171F",
    white: "#FFFFFF",
  },

  error: {
    main: "#FF595E",
  },
  warning: {
    main: "#FFFC99",
  },
  success: {
    main: "#06A77D",
  },
};

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: ["Barlow", "Lato", "sans-serif"].join(","),
    // h1: {
    //   fontFamily: "'Kanit', sans-serif",
    //   fontSize: "6.5rem",
    //   fontWeight: 600,
    //   lineHeight: "auto",
    //   letterSpacing: "-1.5px",
    // },
    // h2: {
    //   fontFamily: "'Kanit', sans-serif",
    //   fontSize: "4.125rem",
    //   fontWeight: 700,
    //   lineHeight: "auto",
    //   letterSpacing: "-1px",
    // },
    // h3: {
    //   fontFamily: "'Kanit', sans-serif",
    //   fontSize: "3.5rem",
    //   fontWeight: 700,
    //   lineHeight: 1.4,
    //   letterSpacing: "-1px",
    // },
    h4: {
      fontFamily: "'Barlow', sans-serif",
      fontSize: "2.5rem",
      fontWeight: 400,
      lineHeight: 1.45,
      letterSpacing: "2px",
    },
    // h5: {
    //   fontFamily: "'Barlow', sans-serif",
    //   fontSize: "2rem",
    //   fontWeight: 500,
    //   lineHeight: 1.3,
    //   letterSpacing: "2px",
    // },
    // h6: {
    //   fontFamily: "'Kanit', sans-serif",
    //   fontSize: "1.5rem",
    //   fontWeight: 700,
    //   lineHeight: 1.3,
    //   letterSpacing: "-1%",
    // },
    subtitle1: {
      fontFamily: "'Lato', sans-serif",
      fontSize: "1.5rem",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: "'Barlow', sans-serif",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.7,
      letterSpacing: 0,
    },
    // body1: {
    //   fontFamily: "'Kanit', sans-serif",
    //   fontSize: "0.875rem",
    //   fontWeight: 500,
    //   lineHeight: 1.4,
    //   letterSpacing: "0.25px",
    // },
    body2: {
      fontFamily: "'Barlow', sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "2px",
      textTransform: "uppercase",
    },

    // caption: {
    //   fontFamily: "'Kanit', sans-serif",
    //   fontSize: "0.625rem",
    //   fontWeight: 400,
    //   lineHeight: 1.5,
    //   letterSpacing: 0,
    // },
    // overline: {
    //   fontFamily: "'Lato', sans-serif",
    //   fontSize: "0.75rem",
    //   fontWeight: 700,
    //   lineHeight: "auto",
    //   letterSpacing: "1%",
    // },

    // button: {
    //   fontFamily: "'Barlow', sans-serif",
    //   fontSize: "0.875rem",
    //   fontWeight: 800,
    //   letterSpacing: "3%",
    //   lineHeight: "auto",
    //   textTransform: "uppercase",
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          maxHeight: 32,
          fontSize: "0.75rem",
          fontWeight: 200,
        },
        sizeMedium: {
          maxHeight: 48,
          fontSize: "1rem",
          letterSpacing: "2px",
          fontWeight: 500,
        },
        sizeLarge: {
          maxHeight: 64,
          fontSize: "1.75rem",
        },
      },
    },
  },
});

export default theme;
