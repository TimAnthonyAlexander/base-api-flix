<?php

use BaseApi\App;
use App\Controllers\HealthController;
use App\Controllers\LoginController;
use App\Controllers\LogoutController;
use App\Controllers\MeController;
use App\Controllers\SignupController;
use App\Controllers\OpenApiController;
use BaseApi\Http\Middleware\RateLimitMiddleware;
use App\Middleware\CombinedAuthMiddleware;

$router = App::router();

$router->get('/health', [
    RateLimitMiddleware::class => ['limit' => '60/1m'],
    HealthController::class,
]);

$router->post('/auth/signup', [
    RateLimitMiddleware::class => ['limit' => '5/1m'],
    SignupController::class,
]);

$router->post('/auth/login', [
    RateLimitMiddleware::class => ['limit' => '10/1m'],
    LoginController::class,
]);

$router->post('/auth/logout', [
    CombinedAuthMiddleware::class,
    LogoutController::class,
]);

$router->get('/me', [
    CombinedAuthMiddleware::class,
    MeController::class,
]);

if (App::config('app.env') === 'local') {
    // OpenAPI schema for API documentation
    $router->get('/openapi.json', [OpenApiController::class]);
}
