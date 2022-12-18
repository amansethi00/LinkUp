import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/600.css';
import App from './App';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif, `,
    body: `'Raleway', sans-serif`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
