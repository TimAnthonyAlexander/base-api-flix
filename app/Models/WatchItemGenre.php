<?php

namespace App\Models;

use BaseApi\Database\Relations\BelongsTo;
use BaseApi\Models\BaseModel;

/**
 * WatchItemGenre Model
 */
class WatchItemGenre extends BaseModel
{
    public string $name;

    public string $watch_item_id;

    public static array $indexes = [
        'name' => 'index',
        'watch_item_id' => 'index',
    ];

    public function watchItem(): BelongsTo
    {
        return $this->belongsTo(WatchItem::class);
    }
}

