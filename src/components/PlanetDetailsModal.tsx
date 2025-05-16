import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton } from '@mui/material';
import type { PlanetData } from '../types';
import CloseIcon from '@mui/icons-material/Close';

interface PlanetDetailsModalProps {
  planet: PlanetData | null;
  open: boolean;
  onClose: () => void;
}

export function PlanetDetailsModal({ planet, open, onClose }: Readonly<PlanetDetailsModalProps>) {
  if (!planet) return null;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          position: 'absolute',
          right: 20,
          top: 20,
          maxWidth: '300px',
          margin: 0,
          bgcolor: 'rgba(10, 10, 30, 0.9)',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(0, 140, 255, 0.3)',
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: 'rgba(0, 0, 0, 0.6)', color: 'white', pb: 1 }}>
        {planet.name}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Orbit distance:</Typography>
            <Typography variant="body2" fontWeight="bold">{planet.radiusFromSun} units</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Size:</Typography>
            <Typography variant="body2" fontWeight="bold">{planet.radius} units</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Orbit speed:</Typography>
            <Typography variant="body2" fontWeight="bold">{planet.orbitSpeed} units/sec</Typography>
          </Box>
          <Box sx={{ mt: 1, width: '100%', height: '20px', borderRadius: 1 }}>
            <div style={{ backgroundColor: planet.color, width: '100%', height: '100%', borderRadius: 4 }} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}