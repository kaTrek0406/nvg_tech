import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/services/LandingPage';
import EcommercePage from './pages/services/EcommercePage';
import BotsPage from './pages/services/BotsPage';
import AutomationPage from './pages/services/AutomationPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services/landing" element={<LandingPage />} />
      <Route path="/services/ecommerce" element={<EcommercePage />} />
      <Route path="/services/bots" element={<BotsPage />} />
      <Route path="/services/automation" element={<AutomationPage />} />
    </Routes>
  );
}
