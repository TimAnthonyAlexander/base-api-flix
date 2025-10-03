<?php

namespace App\Controllers;

use App\Models\WatchItem;
use App\Models\WatchItemMovie;
use App\Models\WatchItemSeason;
use App\Models\WatchItemEpisode;
use BaseApi\Controllers\Controller;
use BaseApi\Http\Attributes\Tag;
use BaseApi\Http\JsonResponse;

#[Tag('Watch Items')]
class WatchItemController extends Controller
{
    public string $id;

    public function get(): JsonResponse
    {
        $watchItem = WatchItem::find($this->id);

        if (!$watchItem instanceof WatchItem) {
            return JsonResponse::notFound('Watch item not found');
        }

        $data = [
            'id' => $watchItem->id,
            'title' => $watchItem->title,
            'type' => $watchItem->type,
            'description' => $watchItem->description,
            'release_year' => $watchItem->release_year,
            'rating' => $watchItem->rating,
            'ratings_count' => $watchItem->ratings_count,
            'created_at' => $watchItem->created_at,
            'updated_at' => $watchItem->updated_at,
        ];

        if ($watchItem->type === 'movie') {
            // Fetch movie details
            /** @var WatchItemMovie[] $movies */
            $movies = $watchItem->movies()->get();
            $movieData = [];
            
            foreach ($movies as $RectorPrefix202411movie) {
                $movieData[] = [
                    'id' => $RectorPrefix202411movie->id,
                    'director' => $RectorPrefix202411movie->director,
                    'duration_minutes' => $RectorPrefix202411movie->duration_minutes,
                    'file_path' => $RectorPrefix202411movie->file_path,
                ];
            }
            
            $data['movies'] = $movieData;
        } elseif ($watchItem->type === 'series') {
            // Fetch series details with seasons and episodes
            /** @var WatchItemSeason[] $seasons */
            $seasons = $watchItem->seasons()->get();
            $seasonsData = [];
            
            foreach ($seasons as $season) {
                /** @var WatchItemEpisode[] $episodes */
                $episodes = $season->episodes()->get();
                $episodesData = [];
                
                foreach ($episodes as $episode) {
                    $episodesData[] = [
                        'id' => $episode->id,
                        'episode_number' => $episode->episode_number,
                        'title' => $episode->title,
                        'description' => $episode->description,
                        'file_path' => $episode->file_path,
                    ];
                }
                
                $seasonsData[] = [
                    'id' => $season->id,
                    'season_number' => $season->season_number,
                    'description' => $season->description,
                    'release_year' => $season->release_year,
                    'episodes' => $episodesData,
                ];
            }
            
            $data['seasons'] = $seasonsData;
        }

        return JsonResponse::ok($data);
    }
}

