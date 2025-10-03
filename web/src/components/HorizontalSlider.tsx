import { Box } from '@mui/material';
import WatchItemCard from './WatchItemCard';
import type { WatchItem } from '../types';

interface HorizontalSliderProps {
  items: WatchItem[];
  onItemClick: (item: WatchItem) => void;
}

function HorizontalSlider({ items, onItemClick }: HorizontalSliderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 2,
        px: 2,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'rgba(255,255,255,0.05)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'rgba(255,255,255,0.2)',
          borderRadius: 4,
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
          },
        },
      }}
    >
      {items.map((item) => (
        <WatchItemCard 
          key={item.id} 
          item={item} 
          onClick={() => onItemClick(item)} 
        />
      ))}
    </Box>
  );
}

export default HorizontalSlider;

