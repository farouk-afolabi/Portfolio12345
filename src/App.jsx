import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles.jsx';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;
