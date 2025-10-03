import { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { WatchItem } from '../types';
import { useGetWatchItemById } from '../hooks';

interface WatchItemModalProps {
  open: boolean;
  watchItem: WatchItem | null;
  onClose: () => void;
}

function WatchItemModal({ open, watchItem, onClose }: WatchItemModalProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  // Fetch full watch item details when modal opens
  const { data: detailsData, loading: loadingDetails } = useGetWatchItemById(
    { id: watchItem?.id || '' },
    { enabled: open && !!watchItem?.id }
  );

  const details = detailsData?.data;

  // Reset selected season when modal opens with a new item
  useEffect(() => {
    if (open && details?.seasons && details.seasons.length > 0) {
      setSelectedSeason(details.seasons[0].season_number || 1);
    }
  }, [open, details?.id]);

  if (!watchItem) return null;

  const isMovie = watchItem.type === 'movie';
  const seasons = details?.seasons || [];
  const movies = details?.movies || [];
  const currentSeason = seasons.find(s => s.season_number === selectedSeason);
  const episodes = currentSeason?.episodes || [];

  const handlePlayMovie = (filePath: string) => {
    // In a real app, this would navigate to the movie player with the file path
    console.log('Playing movie:', watchItem.id, 'File:', filePath);
    alert(`Playing movie: ${filePath}\n(In a real app, this would open the video player)`);
  };

  const handlePlayEpisode = (filePath: string, episodeNumber: number) => {
    // In a real app, this would navigate to the episode player with the file path
    console.log('Playing episode:', selectedSeason, episodeNumber, 'File:', filePath);
    alert(`Playing S${selectedSeason}E${episodeNumber}: ${filePath}\n(In a real app, this would open the video player)`);
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

          <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
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
            {isMovie && movies[0]?.duration_minutes && (
              <Chip
                icon={<AccessTimeIcon />}
                label={`${movies[0].duration_minutes} min`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              />
            )}
            {isMovie && movies[0]?.director && (
              <Chip
                label={`Dir: ${movies[0].director}`}
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

          {loadingDetails ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Movie: Play Button */}
              {isMovie && movies.length > 0 && (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handlePlayMovie(movies[0].file_path || '')}
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

              {isMovie && movies.length === 0 && (
                <Typography color="text.secondary">
                  Movie file not available.
                </Typography>
              )}

              {/* Series: Season Selector and Episodes */}
              {!isMovie && seasons.length > 0 && (
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
                      {seasons.map((season) => (
                        <MenuItem key={season.season_number} value={season.season_number}>
                          Season {season.season_number} ({season.episodes?.length || 0} episodes)
                          {season.release_year && ` - ${season.release_year}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {currentSeason?.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                      {currentSeason.description}
                    </Typography>
                  )}

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Episodes
                  </Typography>

                  {episodes.length > 0 ? (
                    <List sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1 }}>
                      {episodes.map((episode, index) => (
                        <Box key={episode.id || episode.episode_number}>
                          <ListItem disablePadding>
                            <ListItemButton onClick={() => handlePlayEpisode(episode.file_path || '', episode.episode_number || 0)}>
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
                                    flexShrink: 0,
                                  }}
                                >
                                  <PlayArrowIcon />
                                </Box>
                                <ListItemText
                                  primary={`${episode.episode_number}. ${episode.title || `Episode ${episode.episode_number}`}`}
                                  secondary={episode.description || 'No description available.'}
                                  primaryTypographyProps={{ fontWeight: 600 }}
                                />
                              </Box>
                            </ListItemButton>
                          </ListItem>
                          {index < episodes.length - 1 && <Divider />}
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary">
                      No episodes available for this season.
                    </Typography>
                  )}
                </Box>
              )}

              {!isMovie && seasons.length === 0 && (
                <Typography color="text.secondary">
                  No seasons available for this series.
                </Typography>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default WatchItemModal;

