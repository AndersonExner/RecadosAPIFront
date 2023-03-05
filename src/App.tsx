import React from 'react';
import { AppRoutes } from './AppRoutes';
import { GlobalStyle } from './config/GlobalStyles';
import { AppThemeProvider } from './Context/ThemeContext';


function App() {
  return (
    <React.Fragment>
      <AppThemeProvider>
      <GlobalStyle/>
      <AppRoutes />
      </AppThemeProvider>
    </React.Fragment>
  );
}

export default App;
