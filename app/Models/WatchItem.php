<?php

namespace App\Models;

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

    public static array $indexes = [
        'title' => 'index',
        'type' => 'index',
        'release_year' => 'index'
    ];

    public static array $columns = [
        'description' => ['type' => 'TEXT', 'null' => true],
    ];
}

