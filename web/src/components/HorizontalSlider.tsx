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
                width: '100vw',
                overflowX: 'auto',
                overflowY: 'visible',
                pb: 2,
                py: 3,
                px: { xs: 2, sm: 3, md: 6 },
                display: 'flex',
                gap: { xs: 2, sm: 3 },
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': { height: 0 },
                scrollbarWidth: 'none',
            }}
        >
            {items.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        scrollSnapAlign: 'start',
                        flex: '0 0 auto',
                    }}
                >
                    <WatchItemCard item={item} onClick={() => onItemClick(item)} />
                </Box>
            ))}
        </Box>
    );
}

export default HorizontalSlider;
