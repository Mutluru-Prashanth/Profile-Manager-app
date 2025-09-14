import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';

type ProfileType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
};

const ProfileCard = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const local = localStorage.getItem('profile');
    if (local) {
      const parsed = JSON.parse(local);
      setProfile(parsed);
    } else {
      axios.get(`${process.env.REACT_APP_API_URL}/profile`)
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            const latest = res.data[res.data.length - 1];
            setProfile(latest);
            localStorage.setItem('profile', JSON.stringify(latest));
          } else {
            setProfile(null);
          }
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setProfile(null);
        });
    }
  }, []);

  const handleDelete = async () => {
    if (!profile?.id) {
      localStorage.removeItem('profile');
      setProfile(null);
      setSnackbar({ open: true, message: 'Profile deleted locally.', severity: 'success' });
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/${encodeURIComponent(profile.id)}`);
      localStorage.removeItem('profile');
      setProfile(null);
      setSnackbar({ open: true, message: 'Profile deleted.', severity: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed.';
      console.error('Delete error:', message);
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleCreateRedirect = () => {
    setSnackbar({ open: true, message: 'Redirecting to profile form...', severity: 'info' });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const showProfile = profile && profile.firstName && profile.lastName && profile.email;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 3 }}>
        {showProfile ? (
          <>
            <Typography variant="h5" gutterBottom align="center">Profile Details</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Name:</strong> {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {profile.email}
            </Typography>
            {profile.age !== undefined && (
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Age:</strong> {profile.age}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => navigate('/')}>Edit</Button>
              <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>No profile created yet</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Start by creating a new profile to see it here.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateRedirect}>
              Create Profile
            </Button>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity as 'success' | 'error' | 'info'} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ProfileCard;
