import { Box, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

interface GenreSelectorProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

function GenreSelector({ genres, selectedGenre, onGenreSelect }: GenreSelectorProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1.5,
        overflowX: 'auto',
        flexGrow: 1,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
    >
      <Chip
        icon={<HomeIcon />}
        label="Home"
        onClick={() => onGenreSelect(null)}
        sx={{
          bgcolor: !selectedGenre ? 'primary.main' : 'rgba(255,255,255,0.1)',
          color: 'white',
          fontWeight: 600,
          px: 1,
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: !selectedGenre ? 'primary.dark' : 'rgba(255,255,255,0.15)',
          },
        }}
      />
      {genres.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          onClick={() => onGenreSelect(genre)}
          sx={{
            bgcolor: selectedGenre === genre ? 'primary.main' : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontWeight: 600,
            px: 1,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: selectedGenre === genre ? 'primary.dark' : 'rgba(255,255,255,0.15)',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default GenreSelector;

