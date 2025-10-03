# Flix

A modern, Netflix-inspired streaming platform built with BaseAPI and React. Browse movies and TV series, explore by genre, and get personalized recommendations.

![Built with BaseAPI](https://img.shields.io/badge/Built%20with-BaseAPI-e50914)
![PHP](https://img.shields.io/badge/PHP-8.1%2B-777BB4?logo=php)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## Features

### Core Functionality
- **Browse Content**: Explore movies and TV series with rich metadata
- **Genre Filtering**: Browse content by genre categories
- **Personalized Recommendations**: Smart recommendations based on ratings
- **Detailed Views**: View complete information including seasons, episodes, and cast
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### Technical Features
- **Modern UI**: Netflix-inspired interface with smooth animations and hover effects
- **RESTful API**: Full OpenAPI documentation
- **Authentication**: User accounts with session-based and API token authentication
- **Caching**: Performance-optimized with intelligent caching strategies
- **Rate Limiting**: Built-in rate limiting for API endpoints
- **Background Jobs**: Asynchronous processing for emails, backups, and media processing

## Tech Stack

### Backend
- **[BaseAPI](https://github.com/timanthonyalexander/base-api)** - Modern PHP framework by Tim Anthony Alexander
- **PHP 8.1+** - With type safety and modern features
- **SQLite** - Lightweight, embedded database
- **PHPUnit** - Unit and feature testing
- **PHPStan** - Static analysis for type safety
- **Rector** - Automated refactoring and code quality

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Material-UI (MUI)** - Elegant component library
- **OpenAPI Client** - Type-safe API integration

## Quick Start

### Prerequisites
- PHP 8.4 or higher
- Composer
- Node.js 18+ and npm
- SQLite3

### Backend Setup

1. **Install PHP dependencies**
   ```bash
   composer install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run migrations**
   ```bash
   php mason migrate
   ```

4. **Seed the database** (optional)
   ```bash
   php scripts/seeders/content.php
   ```

5. **Start the development server**
   ```bash
   php -S localhost:8000 -t public
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to web directory**
   ```bash
   cd web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update `web/src/http.ts` if your API runs on a different port

4. **Start development server**
   ```bash
   npm run dev
   ```

The web app will be available at `http://localhost:5173`

## Project Structure

```
flix/
├── app/
│   ├── Controllers/       # API endpoint controllers
│   ├── Models/           # Database models
│   ├── Middleware/       # Request middleware
│   ├── Jobs/            # Background jobs
│   ├── Services/        # Business logic services
│   └── Auth/            # Authentication providers
├── config/              # Application configuration
├── public/              # Web server entry point
├── routes/              # API route definitions
├── storage/             # Database, logs, cache
├── tests/               # PHPUnit tests
├── web/                 # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks.ts     # Custom React hooks
│   │   ├── client.ts    # OpenAPI client
│   │   └── types.ts     # TypeScript types
│   └── public/          # Static assets
└── vendor/              # PHP dependencies
```

## API Endpoints

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user info
- `POST /api/token` - Generate API token

### Content
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/genre/{genre}` - Browse content by genre
- `GET /api/watchitem/{id}` - Get detailed watch item information

### System
- `GET /api/health` - Health check endpoint
- `GET /api/openapi` - OpenAPI specification

Full API documentation is available at `/api/openapi` when the server is running.

## Database Models

### WatchItem
Core model representing movies and TV series with metadata:
- Title, description, release year
- Type (movie/series)
- Rating and ratings count
- Poster URL

### WatchItemMovie
Movie-specific details:
- Director
- Duration
- File path

### WatchItemSeason
TV series season information:
- Season number
- Description
- Release year
- Associated episodes

### WatchItemEpisode
Individual episode details:
- Episode number
- Title and description
- File path

### WatchItemGenre
Genre classifications for content discovery

## Development

### Running Tests
```bash
# Run all tests
vendor/bin/phpunit

# Run specific test file
vendor/bin/phpunit tests/Feature/HealthControllerTest.php
```

### Static Analysis
```bash
vendor/bin/phpstan analyse
```

### Code Quality
```bash
vendor/bin/rector process --dry-run
```

### Frontend Development
```bash
cd web
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

## Design Philosophy

Flix follows a **minimalism with spark** design approach:

- **Restrained Elegance**: Vast neutral backgrounds with carefully measured bursts of color
- **Typography as Hero**: Bold, geometric sans-serif headlines with precise hierarchy
- **Motion with Purpose**: Smooth scroll-triggered reveals and whimsical micro-interactions
- **Color Discipline**: Monochrome palette with one or two accent colors per section
- **Responsive Excellence**: Cohesive experience across all device sizes

## Configuration

### Cache
Recommendations are cached for 1 hour by default. Adjust in `RecommendationsController.php`:
```php
Cache::put('recommendations', $responseData, 3600);
```

### Rate Limiting
Rate limits are stored in `storage/ratelimits/`. Configure limits in the middleware.

### Database
SQLite database is stored at `storage/database.sqlite`. For production, consider PostgreSQL or MySQL.

## Deployment

### Backend
1. Set up a production web server (Nginx/Apache)
2. Configure PHP-FPM
3. Set proper file permissions on `storage/` directory
4. Enable OPcache for better performance
5. Set environment to production in `.env`

### Frontend
```bash
cd web
npm run build
```
Serve the `web/dist` directory with your web server.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

The project includes comprehensive tests:
- **Feature Tests**: API endpoint testing
- **Unit Tests**: Model and service testing
- All tests use SQLite in-memory database for isolation

## License

This project is built with [BaseAPI](https://github.com/timanthonyalexander/base-api) by Tim Anthony Alexander.

## Credits

**Made by Tim Anthony Alexander**

Built with [BaseAPI](https://github.com/timanthonyalexander/base-api) - A modern PHP framework for building RESTful APIs.

---

For more information about BaseAPI, visit the [official documentation](https://github.com/timanthonyalexander/base-api).

