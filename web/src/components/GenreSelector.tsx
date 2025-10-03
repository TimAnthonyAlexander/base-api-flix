// GenreSelector.tsx
import { Box } from '@mui/material';

interface GenreSelectorProps {
    genres: string[];
    selectedGenre: string | null;
    onGenreSelect: (genre: string | null) => void;
}

function GenreSelector({ genres, selectedGenre, onGenreSelect }: GenreSelectorProps) {
    const items = ['Home', ...genres];

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, md: 3 },
                overflowX: 'auto',
                pr: 0.5,
                // subtle edge fade like Netflix
                maskImage:
                    'linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,1) 24px, rgba(0,0,0,1) calc(100% - 24px), rgba(0,0,0,0) 100%)',
                WebkitMaskImage:
                    'linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,1) 24px, rgba(0,0,0,1) calc(100% - 24px), rgba(0,0,0,0) 100%)',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
            }}
            role="tablist"
            aria-label="Genres"
        >
            {items.map((label) => {
                const isHome = label === 'Home';
                const active = isHome ? selectedGenre === null : selectedGenre === label;

                return (
                    <Box
                        key={label}
                        component="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onGenreSelect(isHome ? null : label)}
                        sx={{
                            appearance: 'none',
                            border: 0,
                            outline: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: 0,
                            position: 'relative',
                            whiteSpace: 'nowrap',
                            color: active ? '#fff' : 'rgba(255,255,255,0.72)',
                            fontWeight: 700,
                            fontSize: { xs: 14, md: 16 },
                            letterSpacing: '-0.015em',
                            lineHeight: 1,
                            py: 1.25,
                            px: 0.5,
                            transition: 'color 140ms ease',
                            '&:hover': { color: '#fff' },
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: 2,
                                borderRadius: 1,
                                backgroundColor: active ? '#e50914' : 'transparent',
                                transition: 'background-color 160ms ease',
                            },
                            '&:hover::after': {
                                backgroundColor: active ? '#e50914' : 'rgba(255,255,255,0.26)',
                            },
                            // focus ring (keyboard)
                            '&:focus-visible': {
                                outline: '2px solid rgba(229,9,20,0.8)',
                                outlineOffset: 4,
                                borderRadius: 4,
                            },
                        }}
                    >
                        {label}
                    </Box>
                );
            })}
        </Box>
    );
}

export default GenreSelector;
