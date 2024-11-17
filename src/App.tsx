import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppSelector } from './store/app/hooks';
import { Toaster } from 'react-hot-toast';

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const themeValue = useAppSelector(state => state.local.theme);
  useEffect(() => {
    if (themeValue.theme !== mode) {
      setMode(themeValue?.theme as 'light' | 'dark');
    }
  }, [mode, themeValue])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
        </RouterProvider>
      </ThemeProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto !z-[99999999999999]"
      />
    </>
  )
}

export default App
