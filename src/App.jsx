import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/services/LandingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services/landing" element={<LandingPage />} />
    </Routes>
  );
}
