<?php

namespace App\Models;

use BaseApi\Database\Relations\BelongsTo;
use BaseApi\Models\BaseModel;

/**
 * WatchItemMovie Model
 */
class WatchItemMovie extends BaseModel
{
    public string $watch_item_id;

    public ?string $director = null;

    public ?int $duration_minutes = null;

    public static array $indexes = [
        'watch_item_id' => 'index',
        'director' => 'index',
    ];

    public function watchItem(): BelongsTo
    {
        return $this->belongsTo(WatchItem::class);
    }
}

