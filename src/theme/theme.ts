import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    form: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9F1C',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    secondary: {
      main: '#2EC4B6',
      light: '#4FD1C5',
      dark: '#20A69A',
    },
    background: {
      default: '#000',
      paper: '#1f2937',
    },
    text: {
      primary: '#fff',
      secondary: '#5C6378',
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#fff',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(to right, #9b5de5, #f15bb5)',
          '&:hover': {
            opacity: 0.9,
          }
        },
        outlined: {
          border: '1px solid #fff',
          '&:hover': {
            opacity: 0.9,
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f2937',
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none'
        }
      }
    },
  },
});