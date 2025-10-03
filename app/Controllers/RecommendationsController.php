<?php

namespace App\Controllers;

use App\Models\WatchItem;
use App\Models\WatchItemGenre;
use BaseApi\App;
use BaseApi\Cache\Cache;
use BaseApi\Controllers\Controller;
use BaseApi\Database\Drivers\MySqlDriver;
use BaseApi\Http\JsonResponse;

/**
 * RecommendationsController
 * 
 * Add your controller description here.
 */
class RecommendationsController extends Controller
{
    public int $limit = 20;

    public float $minRating = 7.0;

    public function get(): JsonResponse
    {
        if (Cache::has('recommendations')) {
            return JsonResponse::ok(Cache::get('recommendations'));
        }

        $connection = App::connection();
        $isMySql = $connection->getDriver() instanceof MySqlDriver;

        $userId = $this->request->user['id'] ?? 'guest';
        $seed   = $userId . '-' . date('Y-m-d');

        if ($isMySql) {
            $tieExpr  = 'MD5(CONCAT(w.id, ?))';
            $tieParam = $seed;
            $limitExpr = '? + 0';
        } else {
            $offset   = (crc32($seed) % 16) + 1; // 1..16
            $tieExpr  = 'SUBSTR(w.id, ?)';
            $tieParam = $offset;
            $limitExpr = 'CAST(? AS INTEGER)';
        }

        $sql = '
        WITH gi AS (
            SELECT DISTINCT g.name, g.watch_item_id
            FROM ' . WatchItemGenre::table() . ' g
        )
        SELECT name, id, title, type, description, release_year, rating
        FROM (
            SELECT
                gi.name,
                w.id, w.title, w.type, w.description, w.release_year, w.rating,
                ROW_NUMBER() OVER (
                    PARTITION BY gi.name
                    ORDER BY w.rating DESC, ' . $tieExpr . '
                ) AS rn
            FROM gi
            JOIN ' . WatchItem::table() . ' w ON w.id = gi.watch_item_id
            WHERE w.rating >= ?
        ) t
        WHERE t.rn <= ' . $limitExpr . '
        ORDER BY name, rn
    ';

        $rows = $connection->query($sql, [$tieParam, $this->minRating, $this->limit]);

        $grouped = [];
        foreach ($rows as $row) {
            $grouped[$row['name']][] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'type' => $row['type'],
                'description' => $row['description'],
                'release_year' => $row['release_year'],
                'rating' => (float)$row['rating'],
            ];
        }

        $genres = [];
        foreach ($grouped as $name => $items) {
            $genres[] = ['name' => $name, 'items' => $items];
        }

        $responseData = [
            'genres' => $genres,
        ];

        Cache::put('recommendations', $responseData, 3600);

        return JsonResponse::ok($responseData);
    }
}
