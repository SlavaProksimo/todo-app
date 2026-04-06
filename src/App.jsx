import HomePage from "./pages/home/HomePage";
import { ThemeProvider } from "./context/themeProvider";
import { ValidationProvider } from "./context/ValidationProvider";

const App = () => {
  return (
    <ThemeProvider>
      <ValidationProvider>
        <HomePage />
      </ValidationProvider>
    </ThemeProvider>
  );
};

export default App;
