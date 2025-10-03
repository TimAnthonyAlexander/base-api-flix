<?php

namespace App\Models;

use BaseApi\Database\Relations\BelongsTo;
use BaseApi\Models\BaseModel;

/**
 * WatchItemSeason Model
 */
class WatchItemSeason extends BaseModel
{
    public string $watch_item_id;

    public int $season_number;

    public ?string $description = null;

    public ?int $release_year = null;

    public static array $indexes = [
        'watch_item_id' => 'index',
        'season_number' => 'index',
        'release_year' => 'index'
    ];

    public static array $columns = [
        'description' => ['type' => 'TEXT', 'null' => true],
    ];

    public function watchItem(): BelongsTo
    {
        return $this->belongsTo(WatchItem::class);
    }
}
