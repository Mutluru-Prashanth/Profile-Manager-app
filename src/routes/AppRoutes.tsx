import { Routes, Route } from 'react-router-dom';
import FormPage from '../pages/FormPage';
import ProfilePage from '../pages/ProfilePage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<FormPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

export default AppRoutes;
