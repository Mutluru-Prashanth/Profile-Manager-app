import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../features/profileSlice';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) {
      setSnackbar({ open: true, message: 'First name is required.', severity: 'error' });
      return;
    }

   if (firstName.trim().length < 3) {
  setSnackbar({ open: true, message: 'First name must be at least 3 characters.', severity: 'error' });
  return;
}

    if (!lastName.trim()) {
      setSnackbar({ open: true, message: 'Last name is required.', severity: 'error' });
      return;
    }

    if (lastName.trim().length < 3) {
      setSnackbar({ open: true, message: 'Last name must be at least 3 characters.', severity: 'error' });
      return;
    }

    if (!email.trim()) {
      setSnackbar({ open: true, message: 'Email is required.', severity: 'error' });
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setSnackbar({ open: true, message: 'Please enter a valid email address.', severity: 'error' });
      return;
    }

    if (age.trim()) {
      const ageValue = Number(age);
      if (isNaN(ageValue) || ageValue <= 0 || !Number.isInteger(ageValue)) {
        setSnackbar({ open: true, message: 'Please enter a valid age.', severity: 'error' });
        return;
      }
    }

    const profileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      age: age.trim() ? Number(age) : undefined,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, profileData, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('profile', JSON.stringify(profileData));
      dispatch(setProfile(profileData)); 

      setSnackbar({ open: true, message: 'Profile saved successfully!', severity: 'success' });
      setTimeout(() => navigate('/profile'), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: 'Something went wrong. Please try again.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
        Create Profile
      </Typography>

      <TextField label="First Name" fullWidth margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField label="Last Name" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Age (optional)" fullWidth margin="normal" value={age} onChange={(e) => setAge(e.target.value)} />

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity as 'success' | 'error'} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
