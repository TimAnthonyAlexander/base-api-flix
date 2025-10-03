import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import StarIcon from '@mui/icons-material/Star';
import type { WatchItem } from '../types';

interface WatchItemModalProps {
  open: boolean;
  watchItem: WatchItem | null;
  onClose: () => void;
}

function WatchItemModal({ open, watchItem, onClose }: WatchItemModalProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  if (!watchItem) return null;

  const isMovie = watchItem.type === 'movie';

  // Mock data for demonstration - in a real app, you'd fetch this from the API
  const mockSeasons = isMovie ? [] : [
    { number: 1, episodes: 10 },
    { number: 2, episodes: 12 },
    { number: 3, episodes: 8 },
  ];

  const mockEpisodes = Array.from({ length: mockSeasons.find(s => s.number === selectedSeason)?.episodes || 0 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    description: 'Episode description goes here.',
  }));

  const handlePlayMovie = () => {
    // In a real app, this would navigate to the movie player
    console.log('Playing movie:', watchItem.id);
  };

  const handlePlayEpisode = (episodeNumber: number) => {
    // In a real app, this would navigate to the episode player
    console.log('Playing episode:', selectedSeason, episodeNumber);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          maxHeight: '90vh',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {/* Hero Section */}
        <Box
          sx={{
            height: 300,
            bgcolor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 100%)',
          }}
        >
          {isMovie ? (
            <MovieIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.2)' }} />
          ) : (
            <TvIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.2)' }} />
          )}
        </Box>

        <Box sx={{ p: 4, pt: 2 }}>
          {/* Title and Metadata */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {watchItem.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <Chip
              label={isMovie ? 'Movie' : 'Series'}
              icon={isMovie ? <MovieIcon /> : <TvIcon />}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
              }}
            />
            {watchItem.rating !== undefined && watchItem.rating > 0 && (
              <Chip
                icon={<StarIcon />}
                label={`${watchItem.rating.toFixed(1)} / 10`}
                sx={{
                  bgcolor: 'rgba(255,200,0,0.15)',
                  color: '#ffc800',
                }}
              />
            )}
            {watchItem.release_year && (
              <Chip
                label={watchItem.release_year}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              />
            )}
          </Box>

          {/* Description */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            {watchItem.description || 'No description available.'}
          </Typography>

          {/* Movie: Play Button */}
          {isMovie && (
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handlePlayMovie}
              sx={{
                bgcolor: 'primary.main',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Play Movie
            </Button>
          )}

          {/* Series: Season Selector and Episodes */}
          {!isMovie && mockSeasons.length > 0 && (
            <Box>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Season</InputLabel>
                <Select
                  value={selectedSeason}
                  label="Season"
                  onChange={(e) => setSelectedSeason(e.target.value as number)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {mockSeasons.map((season) => (
                    <MenuItem key={season.number} value={season.number}>
                      Season {season.number} ({season.episodes} episodes)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Episodes
              </Typography>

              <List sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1 }}>
                {mockEpisodes.map((episode, index) => (
                  <Box key={episode.number}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handlePlayEpisode(episode.number)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1,
                              bgcolor: 'rgba(255,255,255,0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                            }}
                          >
                            <PlayArrowIcon />
                          </Box>
                          <ListItemText
                            primary={`${episode.number}. ${episode.title}`}
                            secondary={episode.description}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </Box>
                      </ListItemButton>
                    </ListItem>
                    {index < mockEpisodes.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default WatchItemModal;

