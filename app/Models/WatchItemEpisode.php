<?php

namespace App\Models;

use BaseApi\Database\Relations\BelongsTo;
use BaseApi\Models\BaseModel;

/**
 * WatchItemEpisode Model
 */
class WatchItemEpisode extends BaseModel
{
    public string $watch_item_season_id;

    public int $episode_number;

    public ?string $title = null;

    public ?string $description = null;

    public string $file_path;

    public static array $indexes = [
        'watch_item_season_id' => 'index',
        'episode_number' => 'index',
    ];

    public function watchItemSeason(): BelongsTo
    {
        return $this->belongsTo(WatchItemSeason::class);
    }
}
