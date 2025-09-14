import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setProfile } from './features/profileSlice';

import { Routes, Route } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfileCard from './components/ProfileCard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      dispatch(setProfile(JSON.parse(storedProfile)));
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/profile" element={<ProfileCard />} />
      </Routes>
    </>
  );
}

export default App;
