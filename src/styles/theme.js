import { createTheme } from '@mui/material'
import { ptBR } from '@mui/material/locale'
import { ptBR as dateBR } from '@mui/x-date-pickers/locales'
import { alpha } from '@mui/material/styles'

const theme = createTheme(
  {
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray', // Cor padrão
              },
              '&:hover fieldset': {
                borderColor: 'gray', // Cor ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'gray', // Cor ao focar
              },
            },
          },
        },
      },
    },
    palette: {
      primary: {
        main: '#008D4F',
        contrastText: '#FFFFFF',
        lighter: ' #C8FAD6',
      },
      secondary: {
        main: '#CB0C9F',
        contrastText: '#FFFFFF'
      },
      lightGray: {
        main: '#f1f1f1',
        contrastText: '#3A416F'
      },
      gray: {
        main: '#111827',
        contrastText: '#FFFFFF'
      },
      gray500: {
        main: '#718096',
        contrastText: '#FFFFFF'
      },

      darkPurple: {
        main: '#3A416F',
        contrastText: '#FFFFFF'
      },
      lightBlue: {
        main: '#A4D8F7',
        contrastText: '#3A416F'
      },

      progressBlue: {
        main: '#1890FF',
        contrastText: '#FFFFFF'
      },
      progressError: {
        main: '#F5222D',
        contrastText: '#FFFFFF'
      },
      progressSucess: {
        main: '#52C41A',
        contrastText: '#FFFFFF'
      },

      inactive: {
        main: '#6e7781',
        contrastText: '#FFFFFF'
      },

      active: {
        main: '#48BB78',
        contrastText: '#FFFFFF'
      },

      babyBlue: {
        main: '#EBEFF7',
        contrastText: '#3A416F'
      },
      black: {
        main: '#000',
        contrastText: '#EBEFF7'
      },
      tempCold: {
        main: '#1890FF',
        contrastText: '#FFFFFF'
      },
      tempWarm: {
        main: '#Ffff00',
        contrastText: '#000'
      },
      tempHot: {
        main: '#FF8C00		',
        contrastText: '#FFFFFF'
      },

    },

    typography: {
      fontFamily: [
        'Open Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  },
  ptBR,
  dateBR
)

export default theme

export function bgBlur(props) {
  const color = props?.color || '#000000'
  const blur = props?.blur || 6
  const opacity = props?.opacity || 0.8
  const imgUrl = props?.imgUrl

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity)
      }
    }
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity)
  }
}
