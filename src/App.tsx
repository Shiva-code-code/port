import './styles/global.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TelemetryWidget from './components/TelemetryWidget/TelemetryWidget';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Certificates from './components/Certificates/Certificates';
import Achievements from './components/Achievements/Achievements';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingMobileBar from './components/FloatingMobileBar/FloatingMobileBar';

export default function App() {
  return (
    <ThemeProvider>
      <div className="portfolio-app">
        <Navbar />
        <main>
          <Hero />
          <TelemetryWidget />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Certificates />
          <Achievements />
          <Education />
          <Contact />
        </main>
        <Footer />
        <FloatingMobileBar />
      </div>
    </ThemeProvider>
  );
}
