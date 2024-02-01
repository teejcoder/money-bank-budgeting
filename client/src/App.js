import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import { useDarkMode } from './contexts/DarkModeContext';

// Define the main App component
const App = () => {
  // Destructure the isDarkMode variable from the DarkModeContext
  const { isDarkMode } = useDarkMode();

  return (
    // Apply the dark or light class to the entire app based on the isDarkMode value
    <div className={`${isDarkMode ? 'dark' : 'light'} h-screen`}>
      {/* Render the Header component */}
      <Header />
      {/* Render the Hero component */}
      <Hero />
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}

// Export the App component as the default export
export default App;