<?php

declare(strict_types=1);

namespace Scripts\Seeders;

require_once __DIR__ . '/../../vendor/autoload.php';

use BaseApi\App;
use Faker\Factory as FakerFactory;

use App\Models\WatchItem;
use App\Models\WatchItemMovie;
use App\Models\WatchItemSeason;
use App\Models\WatchItemEpisode;
use App\Models\WatchItemGenre;

App::boot(__DIR__ . '/../..');

$faker = FakerFactory::create();

$count = (int)($argv[1] ?? 150);

$genres = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Thriller',
    'War',
    'Western'
];

$videoExtensions = ['mp4', 'mkv', 'mov', 'avi'];

$movieWeight = 6;   // 60% movies
$seriesWeight = 4;  // 40% series

$created = [
    'items' => 0,
    'movies' => 0,
    'series' => 0,
    'seasons' => 0,
    'episodes' => 0,
    'genres' => 0,
];

for ($i = 0; $i < $count; $i++) {
    $isMovie = random_int(1, $movieWeight + $seriesWeight) <= $movieWeight;

    $item = new WatchItem();
    $item->title = trim($faker->unique()->sentence(random_int(2, 5)), '.');
    $item->type = $isMovie ? 'movie' : 'series';
    $item->description = $faker->optional(0.7)->paragraph(random_int(1, 3)) ?? null;
    $item->release_year = $faker->optional(0.9)->numberBetween(1970, (int)date('Y')) ?? null;
    $item->rating = $faker->optional(0.8)->randomFloat(1, 1, 10) ?? 0.0;
    $item->ratings_count = $faker->optional(0.8)->numberBetween(1, 5000) ?? 0;
    $item->save();

    $created['items']++;

    $genreCount = random_int(1, 3);
    $picked = $faker->randomElements($genres, $genreCount);
    foreach ($picked as $g) {
        $wg = new WatchItemGenre();
        $wg->name = $g;
        $wg->watch_item_id = $item->id;
        $wg->save();
        $created['genres']++;
    }

    if ($isMovie) {
        $movie = new WatchItemMovie();
        $movie->watch_item_id = $item->id;
        $movie->director = $faker->optional(0.8)->name() ?? null;
        $movie->duration_minutes = $faker->optional(0.95)->numberBetween(70, 210) ?? null;
        $movie->file_path = sprintf(
            '/storage/videos/%s.%s',
            str_replace(' ', '_', strtolower($item->title)) . '_' . $faker->unique()->bothify('m#####'),
            $faker->randomElement($videoExtensions)
        );
        $movie->save();
        $created['movies']++;
    } else {
        $seasonTotal = random_int(1, 6);
        for ($s = 1; $s <= $seasonTotal; $s++) {
            $season = new WatchItemSeason();
            $season->watch_item_id = $item->id;
            $season->season_number = $s;
            $season->description = $faker->optional(0.5)->sentence(random_int(6, 14)) ?? null;
            $season->release_year = $faker->optional(0.9)->numberBetween(1990, (int)date('Y')) ?? null;
            $season->save();
            $created['seasons']++;

            $episodeTotal = random_int(6, 14);
            for ($e = 1; $e <= $episodeTotal; $e++) {
                $ep = new WatchItemEpisode();
                $ep->watch_item_season_id = $season->id;
                $ep->episode_number = $e;
                $ep->title = $faker->optional(0.85)->sentence(random_int(2, 6)) ?? null;
                $ep->description = $faker->optional(0.5)->paragraph() ?? null;
                $ep->file_path = sprintf(
                    '/storage/videos/%s_s%02de%02d_%s.%s',
                    str_replace(' ', '_', strtolower($item->title)),
                    $s,
                    $e,
                    $faker->unique()->bothify('e#####'),
                    $faker->randomElement($videoExtensions)
                );
                $ep->save();
                $created['episodes']++;
            }
        }
        $created['series']++;
    }
}

echo json_encode($created, JSON_PRETTY_PRINT) . PHP_EOL;
