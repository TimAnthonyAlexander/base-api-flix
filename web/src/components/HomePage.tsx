// HomePage.tsx
import { useState } from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
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

    const { data: recommendationsData, loading: loadingRecommendations, error: recommendationsError } =
        useGetRecommendations(undefined, { enabled: !selectedGenre });

    const { data: genreData, loading: loadingGenre, error: genreError } =
        useGetGenreByGenre({ genre: selectedGenre || '' }, { enabled: !!selectedGenre });

    let genres: Genre[] = [];
    if (selectedGenre) {
        if (genreData?.data?.data) {
            const items = Array.isArray(genreData.data.data) ? genreData.data.data : [genreData.data.data];
            genres = [{ name: selectedGenre, items }];
        }
    } else {
        if (recommendationsData?.data) {
            const data = recommendationsData.data as any;
            genres = data.genres || [];
        }
    }

    const allGenreNames = (recommendationsData?.data as any)?.genres?.map((g: Genre) => g.name) || [];

    const handleGenreSelect = (genre: string | null) => setSelectedGenre(genre);
    const handleWatchItemClick = (item: WatchItem) => setSelectedWatchItem(item);
    const handleCloseModal = () => setSelectedWatchItem(null);

    return (
        <Box sx={{ bgcolor: '#000', color: '#e5e5e5', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(255,255,255,0.06)',
                }}
            >
                <Toolbar sx={{ minHeight: '80px !important', px: { xs: 2, sm: 3, md: 6 } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            mr: 4,
                            color: '#e50914',
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

            <Box sx={{ pt: '80px' }}>
                <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 3, md: 4 } }}>
                    {loadingRecommendations || loadingGenre ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                            <Typography variant="h6" color="rgba(255,255,255,0.6)">Loading...</Typography>
                        </Box>
                    ) : recommendationsError || genreError ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 400,
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Typography variant="h6" color="#ff5656">Error loading content</Typography>
                            <Typography variant="body2" color="rgba(255,255,255,0.6)">
                                {recommendationsError?.message || genreError?.message}
                            </Typography>
                        </Box>
                    ) : genres.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                            <Typography variant="h6" color="rgba(255,255,255,0.6)">No content available</Typography>
                        </Box>
                    ) : (
                        <Box>
                            {genres.map((genre) => (
                                <Box key={genre.name} sx={{ mb: { xs: 4, md: 6 } }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 1.5,
                                            fontWeight: 700,
                                            letterSpacing: '-0.015em',
                                            color: '#fafafa',
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
                </Box>
            </Box>

            <WatchItemModal open={!!selectedWatchItem} watchItem={selectedWatchItem} onClose={handleCloseModal} />

            <Box
                component="footer"
                sx={{
                    py: 4,
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    borderTop: '1px solid',
                    borderColor: 'rgba(255,255,255,0.08)',
                    mt: 4,
                }}
            >
                <Typography variant="body2">Flix • Made by Tim Anthony Alexander</Typography>
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
