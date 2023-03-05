import {createTheme} from '@mui/material';
import { yellow, cyan } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette : {
    background : {
      default : '#f7f6f3',
      paper : '#FFFFFF',
    }    
  },
  typography : {
    allVariants : {
      color : 'black'
    }
  }
});