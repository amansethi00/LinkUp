import React, { useReducer, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Button, Heading, Text, Container } from '@chakra-ui/react';
import LandingPage from './pages/landing_page';
import Admin from './pages/admin';
import { initialValues } from './constants';
import appReducer from './reducer/app.reducer';
import Login from './pages/login';

export const AppContext = React.createContext(null);

export const useAppContext = () => React.useContext(AppContext);

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);
  const [appData, dispatch] = useReducer(appReducer, initialValues);
  return (
    <Container>
      <AppContext.Provider value={{ appData, dispatch }}>
        <RouterProvider router={router} />;
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </AppContext.Provider>
    </Container>
  );
}

export default App;
