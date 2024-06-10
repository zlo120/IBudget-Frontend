import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: 'light',
        common: {
          black: '#000',
          white: '#fff',
        },
    
        primary: {
          light: '#7986cb',
          main: '#fff;',
          dark: '#d5d5d5',
          contrastText: '#000000',
        },
        secondary: {
          light: '#ff4081',
          main: '#f50057',
          dark: '#c51162',
          contrastText: '#fff',
        },
        error: {
          main: '#ff4d4d',
          light: 'rgb(255, 112, 112)',
          dark: 'rgb(178, 53, 53)',
          contrastText: '#fff',
        },
        warning: {
          main: '#ffc04d',
          light: 'rgb(255, 204, 112)',
          dark: 'rgb(178, 134, 53)',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        warnInfo: {
          main: '#fce224',
          light: 'rgb(252, 231, 79)',
          dark: 'rgb(176, 158, 25)',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        success: {
          main: '#4da54e',
          light: 'rgb(112, 183, 113)',
          dark: 'rgb(53, 115, 54)',
          contrastText: '#fff',
        },
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          A100: '#d5d5d5',
          A200: '#aaaaaa',
          A400: '#303030',
          A700: '#616161',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.54)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          hint: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
          paper: '#fff',
        },
        action: {
          active: 'rgba(0, 0, 0, 0.54)',
          hover: 'rgba(0, 0, 0, 0.04)',
          hoverOpacity: 0.04,
          selected: 'rgba(0, 0, 0, 0.08)',
          selectedOpacity: 0.08,
          disabled: 'rgba(0, 0, 0, 0.26)',
          disabledBackground: 'rgba(0, 0, 0, 0.12)',
          disabledOpacity: 0.38,
          focus: 'rgba(0, 0, 0, 0.12)',
          focusOpacity: 0.12,
          activatedOpacity: 0.12,
        },
      }
});

export default theme;