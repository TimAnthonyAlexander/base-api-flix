<?php

declare(strict_types=1);

namespace Scripts\Seeders;

require_once __DIR__ . '/../../vendor/autoload.php';

use BaseApi\App;
use Faker\Factory as FakerFactory;

App::boot(__DIR__ . '/../..');

$faker = FakerFactory::create();
