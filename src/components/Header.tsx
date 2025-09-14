import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header = () => {
  const profile = useSelector((state: RootState) => state.profile.data);

  return (
    <Box sx={{ py: 2, px: 3, background: '#1976d2', color: '#fff' }}>
      <Typography variant="h6">
        Profile Manager {profile ? `— ${profile.firstName} ${profile.lastName}` : ''}
      </Typography>
    </Box>
  );
};

export default Header;
