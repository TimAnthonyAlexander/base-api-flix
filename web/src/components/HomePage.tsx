import { useState } from 'react';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { useGetRecommendations, useGetGenreByGenre } from '../hooks';
import GenreSelector from './GenreSelector';
import HorizontalSlider from './HorizontalSlider';
import WatchItemModal from './WatchItemModal';
import type { WatchItem } from '../types';

interface Genre {
  name: string;
  items: WatchItem[];
}

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedWatchItem, setSelectedWatchItem] = useState<WatchItem | null>(null);

  // Fetch recommendations
  const { data: recommendationsData, loading: loadingRecommendations, error: recommendationsError } = useGetRecommendations(
    undefined,
    { enabled: !selectedGenre }
  );

  // Fetch genre items when a genre is selected
  const { data: genreData, loading: loadingGenre, error: genreError } = useGetGenreByGenre(
    { genre: selectedGenre || '' },
    { enabled: !!selectedGenre }
  );

  // Parse genres from recommendations or genre data
  let genres: Genre[] = [];
  
  if (selectedGenre) {
    // Genre view - genreData.data.data contains the watch items array
    if (genreData?.data?.data) {
      const items = Array.isArray(genreData.data.data) ? genreData.data.data : [genreData.data.data];
      genres = [{ name: selectedGenre, items }];
    }
  } else {
    // Recommendations view - recommendationsData.data.genres contains the array
    if (recommendationsData?.data) {
      const data = recommendationsData.data as any;
      genres = data.genres || [];
    }
  }

  const allGenreNames = (recommendationsData?.data as any)?.genres?.map((g: Genre) => g.name) || [];

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  const handleWatchItemClick = (item: WatchItem) => {
    setSelectedWatchItem(item);
  };

  const handleCloseModal = () => {
    setSelectedWatchItem(null);
  };

  return (
    <Box>
      {/* Header */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ minHeight: '80px !important' }}>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 0,
              fontWeight: 700,
              mr: 6,
              color: 'primary.main',
              letterSpacing: '-0.02em',
            }}
          >
            Flix
          </Typography>
          <GenreSelector 
            genres={allGenreNames}
            selectedGenre={selectedGenre}
            onGenreSelect={handleGenreSelect}
          />
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ pt: '80px' }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {loadingRecommendations || loadingGenre ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <Typography variant="h6" color="text.secondary">Loading...</Typography>
            </Box>
          ) : recommendationsError || genreError ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" color="error">
                Error loading content
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recommendationsError?.message || genreError?.message}
              </Typography>
            </Box>
          ) : genres.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <Typography variant="h6" color="text.secondary">No content available</Typography>
            </Box>
          ) : (
            <Box>
              {genres.map((genre) => (
                <Box key={genre.name} sx={{ mb: 6 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 2, 
                      ml: 2,
                      fontWeight: 600,
                      color: 'secondary.main',
                    }}
                  >
                    {genre.name}
                  </Typography>
                  <HorizontalSlider 
                    items={genre.items} 
                    onItemClick={handleWatchItemClick}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Watch Item Modal */}
      <WatchItemModal 
        open={!!selectedWatchItem}
        watchItem={selectedWatchItem}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          textAlign: 'center',
          color: 'text.secondary',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2">
          Flix • Made by Tim Anthony Alexander
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
          Built with{' '}
          <a 
            href="https://github.com/timanthonyalexander/base-api" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#e50914', textDecoration: 'none' }}
          >
            BaseAPI
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;

