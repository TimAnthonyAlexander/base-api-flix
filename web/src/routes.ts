// Generated route constants and path builder for BaseApi
// Do not edit manually - regenerate with: ./mason types:generate

export const Routes = {
  GetRecommendations: '/recommendations',
  GetGenreByGenre: '/genre/{genre}',
  GetWatchItemById: '/watch-item/{id}',
  GetHealth: '/health',
  PostSignup: '/auth/signup',
  PostLogin: '/auth/login',
  PostLogout: '/auth/logout',
  GetMe: '/me',
  GetOpenApi: '/openapi.json',
} as const;

export type RouteKey = keyof typeof Routes;

/**
 * Build a path from a route key and parameters
 * @param key - The route key
 * @param params - Path parameters to substitute
 * @returns The built path
 */
export function buildPath<K extends RouteKey>(
  key: K,
  params?: Record<string, string | number | null>
): string {
  let path: string = Routes[key];

  if (params) {
    for (const [paramKey, paramValue] of Object.entries(params)) {
      if (paramValue !== null && paramValue !== undefined) {
        path = path.replace(`{${paramKey}}`, encodeURIComponent(String(paramValue)));
      }
    }
  }

  return path;
}

// Type-safe path builders for each route

export function buildGetGenreByGenrePath(params: { genre: string | number }): string {
  return buildPath('GetGenreByGenre', params);
}

export function buildGetWatchItemByIdPath(params: { id: string | number }): string {
  return buildPath('GetWatchItemById', params);
}
