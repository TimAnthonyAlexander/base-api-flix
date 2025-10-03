import { Box, Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import StarIcon from '@mui/icons-material/Star';
import type { WatchItem } from '../types';

interface WatchItemCardProps {
  item: WatchItem;
  onClick: () => void;
}

function WatchItemCard({ item, onClick }: WatchItemCardProps) {
  const isMovie = item.type === 'movie';

  return (
    <Card
      onClick={onClick}
      sx={{
        minWidth: 280,
        maxWidth: 280,
        bgcolor: 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.05) translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          '& .watch-item-media': {
            '&::after': {
              opacity: 0.3,
            },
          },
        },
      }}
    >
      <CardMedia
        component="div"
        className="watch-item-media"
        sx={{
          height: 160,
          bgcolor: 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            bgcolor: 'primary.main',
            opacity: 0,
            transition: 'opacity 0.3s',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {isMovie ? (
            <MovieIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)' }} />
          ) : (
            <TvIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)' }} />
          )}
        </Box>
      </CardMedia>
      <CardContent>
        <Typography 
          variant="h6" 
          noWrap 
          sx={{ 
            fontWeight: 600,
            mb: 1,
          }}
        >
          {item.title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip
            size="small"
            label={isMovie ? 'Movie' : 'Series'}
            icon={isMovie ? <MovieIcon /> : <TvIcon />}
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '0.75rem',
            }}
          />
          {item.rating !== undefined && item.rating > 0 && (
            <Chip
              size="small"
              icon={<StarIcon sx={{ fontSize: 14 }} />}
              label={item.rating.toFixed(1)}
              sx={{
                bgcolor: 'rgba(255,200,0,0.15)',
                color: '#ffc800',
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>

        {item.release_year && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block', mb: 1 }}
          >
            {item.release_year}
          </Typography>
        )}

        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {item.description || 'No description available.'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WatchItemCard;

