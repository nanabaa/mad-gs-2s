import React, { createContext, useContext, ReactNode } from 'react';

type ThemeContextData = {
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryLight: string;
    border: string;
    header: string;
    button: string;
    buttonText: string;
  };
};

const lightColors = {
  background: '#F9F9F9',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  primary: '#E85D2A',
  primaryLight: '#FFF1EB',
  border: '#EEEEEE',
  header: '#FFF5ED',
  button: '#E85D2A',
  buttonText: '#FFFFFF',
};

const ThemeContext = createContext<ThemeContextData>({
  colors: lightColors,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ colors: lightColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);