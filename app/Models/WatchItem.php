<?php

namespace App\Models;

use BaseApi\Database\Relations\HasMany;
use BaseApi\Models\BaseModel;

/**
 * WatchItem Model
 */
class WatchItem extends BaseModel
{
    public string $title;

    public string $type; // e.g., movie, series

    public ?string $description = null;

    public ?int $release_year = null;

    public float $rating = 0.0;

    public int $ratings_count = 0;

    public ?string $poster_url = null;

    public static array $indexes = [
        'title' => 'index',
        'type' => 'index',
        'release_year' => 'index'
    ];

    public static array $columns = [
        'description' => ['type' => 'TEXT', 'null' => true],
    ];

    public function movies(): HasMany
    {
        return $this->hasMany(WatchItemMovie::class);
    }

    public function seasons(): HasMany
    {
        return $this->hasMany(WatchItemSeason::class);
    }
}
