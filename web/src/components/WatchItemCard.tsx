import { Box, Chip, Typography } from '@mui/material';
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
    const poster =
        // adapt these keys to your API if needed
        (item as any).poster_url || (item as any).image || (item as any).thumbnail || null;

    return (
        <Box
            sx={{
                position: 'relative',
                width: { xs: 160, sm: 200, md: 220 },
                // maintain consistent height via aspect ratio
                aspectRatio: '2 / 3',
                borderRadius: 2,
                overflow: 'visible',
                flex: '0 0 auto',
                // establish stacking context for hover layer
                '&:hover .hover-card': { opacity: 1, transform: 'translateY(-12px) scale(1.06)' },
                '&:hover .base': { boxShadow: '0 12px 40px rgba(0,0,0,0.6)' },
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            {/* Base poster (keeps layout stable) */}
            <Box
                className="base"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#111',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 220ms cubic-bezier(0.2,0,0,1)',
                }}
            >
                {/* Poster image or placeholder */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: poster ? `url(${poster})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        bgcolor: poster ? 'transparent' : 'rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {!poster &&
                        (isMovie ? (
                            <MovieIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.28)' }} />
                        ) : (
                            <TvIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.28)' }} />
                        ))}
                </Box>

                {/* Subtle bottom gradient (no text in base state) */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '36%',
                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.7) 100%)',
                    }}
                />
            </Box>

            {/* Hover flyout (overlay that doesn’t shift layout) */}
            <Box
                className="hover-card"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: { xs: 280, sm: 320, md: 360 },
                    // keep the anchor near the original poster
                    transformOrigin: 'top left',
                    transform: 'translateY(0) scale(1)',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'transform 180ms cubic-bezier(0.2,0,0,1), opacity 150ms',
                    zIndex: 5,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 18px 48px rgba(0,0,0,0.7)',
                    bgcolor: '#101010',
                }}
            >
                {/* Flyout header image */}
                <Box
                    sx={{
                        height: { xs: 160, sm: 180, md: 200 },
                        backgroundImage: poster ? `url(${poster})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        bgcolor: poster ? 'transparent' : 'rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {!poster &&
                        (isMovie ? (
                            <MovieIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.3)' }} />
                        ) : (
                            <TvIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.3)' }} />
                        ))}
                </Box>

                {/* Flyout content */}
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1 }}
                        noWrap
                        title={item.title}
                    >
                        {item.title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                        <Chip
                            size="small"
                            label={isMovie ? 'Movie' : 'Series'}
                            icon={isMovie ? <MovieIcon /> : <TvIcon />}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.08)',
                                color: '#fff',
                                height: 24,
                                '& .MuiChip-icon': { fontSize: 16 },
                            }}
                        />
                        {typeof item.rating === 'number' && item.rating > 0 && (
                            <Chip
                                size="small"
                                icon={<StarIcon sx={{ fontSize: 16 }} />}
                                label={item.rating.toFixed(1)}
                                sx={{
                                    bgcolor: 'rgba(255,200,0,0.15)',
                                    color: '#ffc800',
                                    height: 24,
                                }}
                            />
                        )}
                        {item.release_year && (
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {item.release_year}
                            </Typography>
                        )}
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255,255,255,0.75)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.4,
                        }}
                    >
                        {item.description || 'No description available.'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default WatchItemCard;
