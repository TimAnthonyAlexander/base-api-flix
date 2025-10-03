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
        (item as any).poster_url || (item as any).image || (item as any).thumbnail || null;

    return (
        <Box
            onClick={onClick}
            sx={{
                position: 'relative',
                width: { xs: 280, sm: 340, md: 400 },
                height: { xs: 160, sm: 180, md: 200 },
                borderRadius: 2,
                overflow: 'visible',
                cursor: 'pointer',
                flex: '0 0 auto',
                transition: 'transform 280ms cubic-bezier(0.2,0,0,1)',
                '&:hover': {
                    transform: 'scale(1.05)',
                    zIndex: 10,
                },
            }}
        >
            {/* Base landscape image */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#111',
                    backgroundImage: poster ? `url(${poster})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 240ms cubic-bezier(0.2,0,0,1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '.MuiBox-root:hover &': {
                        boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                    },
                }}
            >
                {!poster &&
                    (isMovie ? (
                        <MovieIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.2)' }} />
                    ) : (
                        <TvIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.2)' }} />
                    ))}

                {/* Subtle bottom gradient for non-hover title */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
                        opacity: 1,
                        transition: 'opacity 240ms',
                        '.MuiBox-root:hover &': {
                            opacity: 0,
                        },
                    }}
                />

                {/* Title in corner (non-hover) */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: { xs: 1.5, sm: 2 },
                        opacity: 1,
                        transition: 'opacity 240ms',
                        '.MuiBox-root:hover &': {
                            opacity: 0,
                        },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.85rem', sm: '0.95rem' },
                            lineHeight: 1.3,
                            color: '#fff',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                        }}
                    >
                        {item.title}
                    </Typography>
                </Box>

                {/* Dark overlay on hover to make text readable */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)',
                        opacity: 0,
                        transition: 'opacity 240ms',
                        '.MuiBox-root:hover &': {
                            opacity: 1,
                        },
                    }}
                />
            </Box>

            {/* Details overlay (shown on hover) */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 240ms cubic-bezier(0.2,0,0,1)',
                    '.MuiBox-root:hover &': {
                        opacity: 1,
                    },
                }}
            >
                {/* Content area */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: { xs: 2, sm: 2.5, md: 3 },
                        minWidth: 0,
                        justifyContent: 'center',
                    }}
                >
                    {/* Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                            lineHeight: 1.2,
                            mb: 1.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            color: '#fff',
                            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                        }}
                    >
                        {item.title}
                    </Typography>

                    {/* Metadata */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5, flexWrap: 'wrap' }}>
                        <Chip
                            size="small"
                            label={isMovie ? 'Movie' : 'Series'}
                            icon={isMovie ? <MovieIcon /> : <TvIcon />}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(8px)',
                                color: '#fff',
                                height: 24,
                                fontSize: '0.75rem',
                                '& .MuiChip-icon': { fontSize: 16, color: 'rgba(255,255,255,0.9)' },
                            }}
                        />
                        {typeof item.rating === 'number' && item.rating > 0 && (
                            <Chip
                                size="small"
                                icon={<StarIcon sx={{ fontSize: 16 }} />}
                                label={item.rating.toFixed(1)}
                                sx={{
                                    bgcolor: 'rgba(255,200,0,0.2)',
                                    backdropFilter: 'blur(8px)',
                                    color: '#ffc800',
                                    height: 24,
                                    fontSize: '0.75rem',
                                }}
                            />
                        )}
                        {item.release_year && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'rgba(255,255,255,0.85)',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                                }}
                            >
                                {item.release_year}
                            </Typography>
                        )}
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: 1.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                        }}
                    >
                        {item.description || 'No description available.'}
                    </Typography>
                </Box>
            </Box>

            {/* Hover accent glow */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 2,
                    boxShadow: '0 0 0 0 rgba(147,112,219,0)',
                    transition: 'box-shadow 240ms cubic-bezier(0.2,0,0,1)',
                    pointerEvents: 'none',
                    '.MuiBox-root:hover &': {
                        boxShadow: '0 0 0 1px rgba(147,112,219,0.4)',
                    },
                }}
            />
        </Box>
    );
}

export default WatchItemCard;
