<?php

namespace App\Controllers;

use App\Models\WatchItem;
use App\Models\WatchItemGenre;
use BaseApi\Controllers\Controller;
use BaseApi\Http\Attributes\ResponseType;
use BaseApi\Http\Attributes\Tag;
use BaseApi\Http\JsonResponse;

#[Tag('Genres', 'Recommendations')]
class GenreController extends Controller
{
    public string $genre;

    #[ResponseType(['data' => WatchItem::class])]
    public function get(): JsonResponse
    {
        $genreItems = WatchItemGenre::where('name', 'LIKE', $this->genre)->get();

        $watchItems = [];

        foreach ($genreItems as $genreItem) {
            assert($genreItem instanceof WatchItemGenre);
            $watchItem = $genreItem->watchItem()->get();

            if ($watchItem) {
                $watchItems[] = $watchItem;
            }
        }

        return new JsonResponse(['data' => $watchItems]);
    }
}
