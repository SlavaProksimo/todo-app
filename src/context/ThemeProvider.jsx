import { useContext, useState, createContext } from "react";

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
