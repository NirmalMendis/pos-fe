'use client';
import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    subdued: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subdued?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subdued: true;
  }
}

export const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F9F9FE',
          paper: '#EEEEF9',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#2A4364',
          paper: '#112E4D',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small',
        style: {
          borderRadius: 8,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
      },
    },
  },
  typography: {
    fontSize: 11,
    fontFamily: ['Segoe UI Symbol', 'Segoe UI Emoji', '"Segoe UI"', 'Roboto', '"Apple Color Emoji"', '-apple-system', 'Arial', 'sans-serif'].join(','),
    h6: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
    h4: {
      textTransform: 'uppercase',
    },
    subdued: {
      color: '#8a8a8a',
    },
  },
});
